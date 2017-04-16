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
    console.log("bid to service");
    this.playerService.makeBid(player.firstName, player.lastName, player.overall, player.position, salaryBid, yearsBid, teamBid)

    this.flashMessage.show(salaryBid +" auf "+ player.lastName +" geboten von "+teamBid, {
      cssClass: 'alert-success',
      timeout: 10000});
  }


}
