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

  //teams: any = ['ATL', 'ORL', 'TOR'];


  constructor(private authService:AuthService,
              private router:Router,
              private playerService: PlayerService) { }

  ngOnInit() {


  }

  clickForAllPlayers(){
    this.allPlayers = null;
    this.playerService.getAllPlayers().subscribe(allPlayers => {
    this.allPlayers = allPlayers;
    },
    err => {
      console.log(err);
      return false;
    });
    this.show = true;
  }
  clickForPlayerByLastName(lastName){
    this.allPlayers = null;
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
    this.allPlayers = null;
    this.playerService.getPlayerByTeam(team).subscribe(allPlayers => {
    this.allPlayers = allPlayers;
    },
    err => {
      console.log(err);
      return false;
    });
    this.show = true;
  }
}
