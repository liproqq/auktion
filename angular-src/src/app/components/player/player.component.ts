import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PlayerService} from '../../services/player.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
  teams: Array<Object> = [{short: "ATL", long:"Atlanta Hawks"},{short: "BOS", long:"Boston Celtics"},{short: "BKN", long:"Brooklyn Nets"},{short: "CHA", long:"Charlotte Hornets"},{short: "CHI", long:"Chicago Bulls"},{short: "CLE", long:"Cleveland Cavaliers"},{short: "DAL", long:"Dallas Mavericks"},{short: "DEN", long:"Denver Nuggets"},{short: "DET", long:"Detroit Pistons"},{short: "GSW", long:"Golden State Warriors"},{short: "HOU", long:"Houston Rockets"},{short: "IND", long:"Indiana Pacers"},{short: "LAC", long:"Los Angeles Clippers"},{short: "LAL", long:"Los Angeles Lakers"},{short: "MEM", long:"Memphis Grizzlies"},{short: "MIA", long:"Miami Heat"},{short: "MIL", long:"Milwaukee Bucks"},{short: "MIN", long:"Minnesota Timberwolves"},{short: "NOP", long:"New Orleans Pelicans"},{short: "NYK", long:"New York Knicks"},{short: "OKC", long:"Oklahoma City Thunder"},{short: "ORL", long:"Orlando Magic"},{short: "PHI", long:"Philadelphia 76ers"},{short: "PHX", long:"Phoenix Suns"},{short: "POR", long:"Portland Trail Blazers"},{short: "SAC", long:"Sacramento Kings"},{short: "SAS", long:"San Antonio Spurs"},{short: "TOR", long:"Toronto Raptors"},{short: "UTA", long:"Utah Jazz"},{short: "WAS", long:"Washington Wizards"}];
  private sub: any;


  constructor(private authService:AuthService,
              private router:Router,
              private playerService: PlayerService,
              private route: ActivatedRoute) { }

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

    //check for team param in URL

    this.sub = this.route.params.subscribe(params => {
       this.filterQuery = params['id'];
       this.searchType = "team";
    });
  }

  changeType(key){
    this.searchType=key;
    console.log(key)
  }

  resetQuery(){
    this.allPlayers = null;
    this.filterQuery= "";
  }

  addToWatchlist(player){
    let user = JSON.parse(localStorage.getItem('user'));
    this.playerService.updateWatchlist(player, user);
  }
}
