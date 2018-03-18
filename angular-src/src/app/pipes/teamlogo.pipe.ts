import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamlogo'
})
export class TeamlogoPipe implements PipeTransform {

  teams: Array<any> = [{short: "ATL", long:"Atlanta Hawks"},{short: "BOS", long:"Boston Celtics"},{short: "BKN", long:"Brooklyn Nets"},{short: "CHA", long:"Charlotte Hornets"},{short: "CHI", long:"Chicago Bulls"},{short: "CLE", long:"Cleveland Cavaliers"},{short: "DAL", long:"Dallas Mavericks"},{short: "DEN", long:"Denver Nuggets"},{short: "DET", long:"Detroit Pistons"},{short: "GSW", long:"Golden State Warriors"},{short: "HOU", long:"Houston Rockets"},{short: "IND", long:"Indiana Pacers"},{short: "LAC", long:"Los Angeles Clippers"},{short: "LAL", long:"Los Angeles Lakers"},{short: "MEM", long:"Memphis Grizzlies"},{short: "MIA", long:"Miami Heat"},{short: "MIL", long:"Milwaukee Bucks"},{short: "MIN", long:"Minnesota Timberwolves"},{short: "NOP", long:"New Orleans Pelicans"},{short: "NYK", long:"New York Knicks"},{short: "OKC", long:"Oklahoma City Thunder"},{short: "ORL", long:"Orlando Magic"},{short: "PHI", long:"Philadelphia 76ers"},{short: "PHX", long:"Phoenix Suns"},{short: "POR", long:"Portland Trail Blazers"},{short: "SAC", long:"Sacramento Kings"},{short: "SAS", long:"San Antonio Spurs"},{short: "TOR", long:"Toronto Raptors"},{short: "UTA", long:"Utah Jazz"},{short: "WAS", long:"Washington Wizards"}];


  transform(team:any): any {
    //if(player.team.length != 3){return "Free Agent"}
    //let team = this.shortToLong(player.team).replace(/\s/g, "-");

    team =="NOP"?team="no":"";
    team =="UTA"?team="utah":"";



    return "http://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/"+team+".png";


  }

  /*shortToLong(teamshort: string):any {
    var index = -1;
    for(var i = 0, len = this.teams.length; i < len; i++) {
      if (this.teams[i].short === teamshort) {
          index = i;
          break;
      }
    }
    return this.teams[i].long;
  }*/

}
