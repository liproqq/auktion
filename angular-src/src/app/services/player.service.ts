import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PlayerService {
  isDev:boolean;
  bid: any;
  result: any;

  constructor(private http:Http) {
    this.isDev = false; // Change to false before deployment
 }

  getAllPlayers(){
    return this.http.get("http://localhost:8080/player/all")
        .map(res => res.json());
  }

  getPlayerByLastName(lastName){
    return this.http.get("http://localhost:8080/player/lastname/"+lastName)
    .map(res => res.json());
  }

  getPlayerByTeam(team){
    return this.http.get("http://localhost:8080/player/team/"+team)
    .map(res => res.json());
  }

  getRoster(user){
    return this.http.get("http://localhost:8080/player/team/"+user.team)
    .map(res => res.json());
  }

  getFreeAgents(){
    return this.http.get("http://localhost:8080/player/freeagents")
        .map(res => res.json());
  }

  makeBid(firstName, lastName, overall, position, salary, duration, team){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint("bid/placebid")
    var bid = {
      firstName:firstName,
      lastName:lastName,
      overall: parseInt(overall),
      position: position,
      salary: parseInt(salary),
      duration: parseInt(duration),
      team: team
    }
    this.http.post(ep, bid, { headers: headers })
     .map((res) => res.json()).subscribe(res => {
       this.result = res;
       console.log(this.result);
     });
  }

  getBids(user){
    return this.http.get("http://localhost:8080/bid/team/"+user.team).map(res => res.json());
  }

  prepEndpoint(ep){
      return 'http://localhost:8080/'+ep;
  }
}
