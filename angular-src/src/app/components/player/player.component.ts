import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PlayerService} from '../../services/player.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  allPlayers: Array<Object>;
  show: boolean = false;
  public filterQuery = "";
  public searchType = "lastName";
  teams: Array<Object> = [{short: "ATL", long:"Atlanta Hawks"},{short: "BOS", long:"Boston Celtics"}]


  constructor(private authService:AuthService,
              private router:Router,
              private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getAllPlayers().subscribe(allPlayers => {
    this.allPlayers = allPlayers;
    //console.log(allPlayers);
    },
    err => {
      console.log(err);
      return false;
    });
    this.show = true;
  }

  changeType(key){
    this.searchType=key;
  }

  clickForAllPlayers(){
    this.resetQuery();
    this.playerService.getAllPlayers().subscribe(allPlayers => {
    this.allPlayers = allPlayers;
    console.log(allPlayers);
    },
    err => {
      console.log(err);
      return false;
    });
    this.show = true;
  }
  clickForPlayerByLastName(lastName){
    this.resetQuery();
    this.playerService.getPlayerByLastName(lastName).subscribe(allPlayers => {
    this.allPlayers = allPlayers;
    },
    err => {
      console.log(err);
      return false;
    });
    this.show = true;
  }

  clickForPlayerByTeam(team){
    this.resetQuery();
    this.playerService.getPlayerByTeam(team).subscribe(allPlayers => {
    this.allPlayers = allPlayers;
    },
    err => {
      console.log(err);
      return false;
    });
    this.show = true;
  }

  clickForFreeAgents(){
    this.resetQuery();
    this.playerService.getFreeAgents().subscribe(allPlayers => {
    this.allPlayers = allPlayers;
    },
    err => {
      console.log(err);
      return false;
    });
    this.show = true;
  }

  resetQuery(){
    this.allPlayers = null;
    this.filterQuery= "";
  }
}
