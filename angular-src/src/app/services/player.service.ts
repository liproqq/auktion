import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class PlayerService {


  constructor(private http:Http) {

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
}
