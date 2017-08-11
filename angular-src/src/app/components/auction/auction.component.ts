import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
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

  constructor(private authService:AuthService,
              private router:Router,
              private playerService: PlayerService,
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.playerService.getFreeAgents().subscribe(freeAgents => {
    this.freeAgents = freeAgents;
    },
    err => {
      console.log(err);
      return false;
    });
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
    player.newSalaryBid = Math.floor(player.newSalaryBid/100000)*100000;
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

    //Enough money
    if(salaryBid > money){
      this.flashMessage.show("Not enough salary cap left for this bid - check profile for your payroll - you have "+money/1000000+" Mio left", {
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

    if(trumpBid(player)){
      this.playerService.placeBid(player);
      console.log("bid to service");
      console.log(player);
      this.flashMessage.show(player.salaryBid +" bid for "+ player.lastName +" by "+player.teamBid,  {
        cssClass: 'alert-success',
        timeout: 5000});
    }
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
