import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PlayerService} from '../../services/player.service';
import {TradesService} from '../../services/trades.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  allPlayers:Array<Object>;
  ownPlayers:Array<Object>;
  otherPlayersInTrade:Array<Object>= [];
  ownPlayersInTrade:Array<Object>= [];
  user:any;

  teams: Array<Object> = [{short: "ATL", long:"Atlanta Hawks"},{short: "BOS", long:"Boston Celtics"},{short: "BKN", long:"Brooklyn Nets"},{short: "CHA", long:"Charlotte Hornets"},{short: "CHI", long:"Chicago Bulls"},{short: "CLE", long:"Cleveland Cavaliers"},{short: "DAL", long:"Dallas Mavericks"},{short: "DEN", long:"Denver Nuggets"},{short: "DET", long:"Detroit Pistons"},{short: "GSW", long:"Golden State Warriors"},{short: "HOU", long:"Houston Rockets"},{short: "IND", long:"Indiana Pacers"},{short: "LAC", long:"Los Angeles Clippers"},{short: "LAL", long:"Los Angeles Lakers"},{short: "MEM", long:"Memphis Grizzlies"},{short: "MIA", long:"Miami Heat"},{short: "MIL", long:"Milwaukee Bucks"},{short: "MIN", long:"Minnesota Timberwolves"},{short: "NOP", long:"New Orleans Pelicans"},{short: "NYK", long:"New York Knicks"},{short: "OKC", long:"Oklahoma City Thunder"},{short: "ORL", long:"Orlando Magic"},{short: "PHI", long:"Philadelphia 76ers"},{short: "PHX", long:"Phoenix Suns"},{short: "POR", long:"Portland Trail Blazers"},{short: "SAC", long:"Sacramento Kings"},{short: "SAS", long:"San Antonio Spurs"},{short: "TOR", long:"Toronto Raptors"},{short: "UTA", long:"Utah Jazz"},{short: "WAS", long:"Washington Wizards"}];

  public filterQuery = "";
  public searchType = "team";

  constructor(private authService:AuthService,
              private router:Router,
              private playerService: PlayerService,

              private tradesService: TradesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllPlayers();
    this.initUser();
  }


  // add player to deal

  addPlayer(player, array){
    array.push(player)
    //this.ownPlayersInTrade.push(player);
  }


  // TODO: refactor into one function like above.
  /*
    Bug: treats as new array instead of this
  */
  removeOwnPlayer(player){
    this.ownPlayersInTrade = this.ownPlayersInTrade.filter((value) => {return value != player });

  }

  removeOtherPlayer(player){
    this.otherPlayersInTrade = this.otherPlayersInTrade.filter((value) => {return value != player });
  }


  // init functions

  getAllPlayers(){
    this.playerService.getAllPlayers().subscribe(allPlayers => {
      this.allPlayers = allPlayers;
      console.log(allPlayers);
      this.filterOwnPlayers(allPlayers);
    },
    err => {
      console.log(err);
      return false;
    });
  }

  initUser(){
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;},
    err => {
      console.log(err);
      return false;
    });
  }

  filterOwnPlayers(allPlayers){
    this.ownPlayers = allPlayers.filter((value) => {return value.team == this.user.team})
  }

}
