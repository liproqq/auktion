import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import {PlayerService} from '../../services/player.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  freeAgents: Array<Object>;
  public team: String;
  public filterQuery = "";
  public searchType = "lastName";
  public money:any = 0;
  private now:any= 0;

  constructor(private authService:AuthService,
              private router:Router,
              private playerService: PlayerService,
              private validateService: ValidateService,
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.playerService.getFreeAgents().subscribe(freeAgents => {
    this.freeAgents = freeAgents;
    },
    err => {
      console.log(err);
      return false;
    });

    this.now = Date.now();
    let user = JSON.parse(localStorage.getItem('user'));
    this.money = user.money;

    if(this.now>1507140000000 && this.now<1507485600000){
      console.log("auction active")
      this.flashMessage.show("Auctions are active. Sudden Death Timer will be active in "+Math.floor((1507485600000-this.now)/60000)+" Minutes (Sunday October 8th 8 pm CEST) for four hours. On Sudden Death Timer every successful bid will be signed after being highest bid for 5 minutes.", {
        cssClass: 'alert-success',
        timeout: 30000});
    }

    if(this.now>1507485600000 && this.now<1507485600000){
      console.log("auction sudden death active")
      this.flashMessage.show("Sudden Death Timer active for "+Math.floor((1507485600000-this.now)/60000)+" minutes. On Sudden Death Timer every successful bid will be signed after being highest bid for 5 minutes.", {
        cssClass: 'alert-danger',
        timeout: 60000});
    }
  }

  changeType(key){
    this.searchType=key;
  }

  bid(player, salaryBid, yearsBid){
    let newTeamBid = JSON.parse(localStorage.getItem("user")).team;
    let money = JSON.parse(localStorage.getItem("user")).money;
    player.newTeamBid = newTeamBid;
    let newTimeBid = Date.now()/1;

    //formatting bid
    player.newSalaryBid = Math.floor(player.newSalaryBid);
    player.newDurationBid = parseInt(player.newDurationBid);
    player.newTimeBid = newTimeBid;

    function trumpBid(player){ //returns true if new bid trumped old bid

      //todo: five years
      if(player.durationBid == 5 || player.newDurationBid == 5){
        return false;
      }

      //first bid
      if(player.durationBid == null && player.salaryBid == null){
          return true;
      }

      //same years
      if(player.durationBid == player.newDurationBid && player.salaryBid < player.newSalaryBid){
          return true;
      }

      //new one year more
      if(player.durationBid+1 == player.newDurationBid && player.salaryBid*.8 < player.newSalaryBid){
        return true;
      }

      //new two years more
      if(player.durationBid+2 == player.newDurationBid && player.salaryBid*.64 < player.newSalaryBid){
        return true;
      }

      //new three years more
      if(player.durationBid+3 == player.newDurationBid && player.salaryBid*.51 < player.newSalaryBid){
        return true;
      }

      //new one year less
      if(player.durationBid-1 == player.newDurationBid && player.salaryBid*1.3 < player.newSalaryBid){
        return true;
      }

      //new two years less
      if(player.durationBid-2 == player.newDurationBid && player.salaryBid*1.6 < player.newSalaryBid){
        return true;
      }

      //new three years less
      if(player.durationBid-3 == player.newDurationBid && player.salaryBid*2 < player.newSalaryBid){
        return true;
      }

      return false;
    }

    //Validate offer
    if(salaryBid == undefined || yearsBid == undefined){
      this.flashMessage.show("Invalid Offer - No bid or contract length", {
        cssClass: 'alert-danger',
        timeout: 10000});
      return false;
    }

    if(!this.validateService.validateBid(player.newSalaryBid)){
      this.flashMessage.show('Please use only numbers in your bid', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Min salary
    if(salaryBid <10){
      this.flashMessage.show("Invalid Offer - Minimum salary is €10", {
        cssClass: 'alert-danger',
        timeout: 10000});
      return false;
    }

    //max salary
    if(salaryBid>1000){
      {
        this.flashMessage.show("Invalid Offer - Maximum salary is €1000", {
          cssClass: 'alert-danger',
          timeout: 10000});
        return false;
      }
    }

    //Enough money
    if(salaryBid > money){
      this.flashMessage.show("Not enough salary cap left for this bid - check profile for your payroll - you have "+money+" Mio left", {
        cssClass: 'alert-danger',
        timeout: 10000});
      return false;
    }

    1507743715817
    //regular season
    if(this.now>1507743715817 && yearsBid > 1){
      this.flashMessage.show("Invalid Offer - You can only offer one season contracts during the regular season.", {
        cssClass: 'alert-danger',
        timeout: 10000});
      return false;
    }

    //Birds
    if(player.lastTeam != newTeamBid && yearsBid == 5){
      this.flashMessage.show("Invalid Offer - Only former team can offer five years on a player with bird rights.", {
        cssClass: 'alert-danger',
        timeout: 10000});
      return false;
    }

    //bid didn't trump
    if(!trumpBid(player)){
      this.flashMessage.show("Invalid Offer - Your bid didn't trump the current offer.", {
        cssClass: 'alert-danger',
        timeout: 10000});
      return false;
    }

    //succesful bid
    if(trumpBid(player)){

      let user = JSON.parse(localStorage.getItem('user'));
      user.money -= player.newSalaryBid; // cookie
      this.money -= player.newSalaryBid; // UI
      localStorage.setItem('user', JSON.stringify(user));
      this.playerService.placeBid(player);
      console.log("bid to service");
      console.log(player);
      this.flashMessage.show(player.salaryBid +" bid for "+ player.lastName +" by "+player.teamBid,  {
        cssClass: 'alert-success',
        timeout: 5000});
    }
  }

  addToWatchlist(player){
    let user = JSON.parse(localStorage.getItem('user'));
    this.playerService.updateWatchlist(player, user);
  }


    /*
      NBA CBA
    //Validate offer
    if(salaryBid == undefined || yearsBid == undefined){
      this.flashMessage.show("Invalid Offer - No bid or contract length", {
        cssClass: 'alert-danger',
        timeout: 10000});
      return false;
    }

    if(player.lastTeam != teamBid && yearsBid == 5){
      this.flashMessage.show("Invalid Offer - Only former team can offer five years", {
        cssClass: 'alert-danger',
        timeout: 10000});
      return false;
    }

    //minimum salary
    if(salaryBid < this.minSalary(player.age)){
      this.flashMessage.show("Invalid Offer - minimum bid is "+this.minSalary(player.age) , {
        cssClass: 'alert-danger',
        timeout: 10000});
      player.salaryBid = this.minSalary(player.age);
      return false;
    }

    //maximum salary
    if(salaryBid > this.maxSalary(player.age)){
      this.flashMessage.show("Invalid Offer - maximum bid is "+this.maxSalary(player.age) , {
        cssClass: 'alert-danger',
        timeout: 10000});
      player.salaryBid = this.maxSalary(player.age);
      return false;
    }



    this.playerService.makeBid(player.firstName, player.lastName, player.overall, player.position, salaryBid, yearsBid, teamBid);
    console.log("bid to service");
    this.flashMessage.show(salaryBid +" bid for "+ player.lastName +" by "+teamBid,  {
      cssClass: 'alert-success',
      timeout: 5000});
  }

  minSalary(age){
    switch(age-20){
      case 0: return 815615;
      case 1: return 1345427;
      case 2: return 1544951;
      case 3: return 1638627;
      case 4: return 1734954;
      case 5: return 1880492;
      case 6: return 2026033;
      case 7: return 2171575;
      case 8: return 2317118;
      case 9: return 2328651;
      default: return 2561518;
    }
  }

  maxSalary(age){
    const exp = age-20;
    if(exp <7){
      return 25000000;
    } else if (exp <10){
      return 30000000;
    } else {
      return 35000000;
    }
  }*/

}
