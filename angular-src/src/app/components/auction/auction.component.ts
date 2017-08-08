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
  allPlayers: Array<Object>;
  public team: String;
  public filterQuery = "";
  public searchType = "lastName";

  constructor(private authService:AuthService,
              private router:Router,
              private playerService: PlayerService,
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.playerService.getFreeAgents().subscribe(allPlayers => {
    this.allPlayers = allPlayers;
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
    let teamBid = JSON.parse(localStorage.getItem("user")).team;
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
    }*/
  }

}
