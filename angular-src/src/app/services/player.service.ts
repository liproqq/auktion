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
    let ep = this.prepEndpoint('player/all');
    return this.http.get(ep)
        .map(res => res.json());
  }

  getPlayerByLastName(lastName){
    let ep = this.prepEndpoint('player/lastname/');
    return this.http.get(ep+lastName)
    .map(res => res.json());
  }

  getPlayerByTeam(team){
    let ep = this.prepEndpoint('player/team/');
    return this.http.get(ep+team)
    .map(res => res.json());
  }

  getRoster(user){
    let ep = this.prepEndpoint('player/team/');
    return this.http.get(ep+user.team)
    .map(res => res.json());
  }

  getFreeAgents(){
    let ep = this.prepEndpoint('player/freeagents');
    return this.http.get(ep)
        .map(res => res.json());
  }

  makeBid(firstName, lastName, overall, position, salary, duration, team){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint("bid/placebid");
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
    let ep = this.prepEndpoint('bid/team/');
    return this.http.get(ep+user.team).map(res => res.json());
  }

  deleteBid(id){
    let ep = this.prepEndpoint("bid/delete/"+id);
    this.http.delete(ep)
     .map((res) => res.json()).subscribe(res => {
       this.result = res;
       console.log(this.result);
     });
  }

  prepEndpoint(ep){
    if(this.isDev){
      return ep;
    } else {
      return 'http://localhost:8080/'+ep;
    }
  }
}
