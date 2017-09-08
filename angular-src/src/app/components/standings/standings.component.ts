import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {StandingsService} from '../../services/standings.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  results: any;
  user:any;
  report:Object = {
    for:Number,
    against:Number,
    opponent:String,
  }
  teams: Array<Object> = [{short: "ATL", long:"Atlanta Hawks"},{short: "BOS", long:"Boston Celtics"},{short: "BKN", long:"Brooklyn Nets"},{short: "CHA", long:"Charlotte Hornets"},{short: "CHI", long:"Chicago Bulls"},{short: "CLE", long:"Cleveland Cavaliers"},{short: "DAL", long:"Dallas Mavericks"},{short: "DEN", long:"Denver Nuggets"},{short: "DET", long:"Detroit Pistons"},{short: "GSW", long:"Golden State Warriors"},{short: "HOU", long:"Houston Rockets"},{short: "IND", long:"Indiana Pacers"},{short: "LAC", long:"Los Angeles Clippers"},{short: "LAL", long:"Los Angeles Lakers"},{short: "MEM", long:"Memphis Grizzlies"},{short: "MIA", long:"Miami Heat"},{short: "MIL", long:"Milwaukee Bucks"},{short: "MIN", long:"Minnesota Timberwolves"},{short: "NOP", long:"New Orleans Pelicans"},{short: "NYK", long:"New York Knicks"},{short: "OKC", long:"Oklahoma City Thunder"},{short: "ORL", long:"Orlando Magic"},{short: "PHI", long:"Philadelphia 76ers"},{short: "PHX", long:"Phoenix Suns"},{short: "POR", long:"Portland Trail Blazers"},{short: "SAC", long:"Sacramento Kings"},{short: "SAS", long:"San Antonio Spurs"},{short: "TOR", long:"Toronto Raptors"},{short: "UTA", long:"Utah Jazz"},{short: "WAS", long:"Washington Wizards"}];


  constructor(private authService:AuthService,
              private router:Router,
              private flashMessage:FlashMessagesService,
              private standingsService: StandingsService) { }

  ngOnInit() {
    this.loadStandings();
    this.user = JSON.parse(localStorage.getItem('user')).team;
  }

  loadStandings(){
    this.standingsService.getAllResults().subscribe(data =>{
        this.results = this.convertStandings(data);
        this.sortByWins(this.results);
        this.gamesBehind(this.results);
    },
    err => {
      console.log(err);
      return false;
    });

  }

  convertStandings(reports){
    var standingRow = [];
    reports.forEach((value)=>{
      var row = {
        name: value.reporter,
        w: this.countWins(value.reports),
        l: value.reports.length - this.countWins(value.reports),
        pct: Math.floor(this.countWins(value.reports)/value.reports.length*100) +"%"
      }
      standingRow.push(row)
    })
    standingRow = this.sortByWins(standingRow);
    standingRow = this.gamesBehind(standingRow);
    return standingRow;
  }

  countWins(reports){
    var wins = 0;
    reports.forEach(value => {
      if(value.for>value.against){wins++};
    })
    return wins;
  }

  sortByWins(value){

    return value.sort(function (a, b) {
      if (a.w < b.w) {
        return 1;
      }
      if (a.w > b.w) {
        return -1;
      }

      //same w
      if (a.l < b.l) {
        return 1;
      }
      if (a.l > b.l) {
        return -1;
      }

      return 0;
    })
  }

  gamesBehind(standings){
    for(var i = 1;i<standings.length;i++){
      standings[i].gb = ((standings[0].w - standings[i].w)+(standings[i].l - standings[0].l))/2;
    }
    return standings
  }

  reportGame(report){
    console.log(report);
    if(typeof report.for != "Number" || typeof report.against != "Number" || typeof report.opponent != "String"){
        this.flashMessage.show('Please fill in all fields!', {cssClass: 'alert-danger', timeout: 3000})
        return false;
    }
    this.standingsService.saveGame(report, this.user);
    this.flashMessage.show('Game saved!', {cssClass: 'alert-success', timeout: 3000});
  }
}
