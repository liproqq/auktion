import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StandingsService {
  isDev:boolean;
  result: any;

  constructor(private http:Http) {
    this.isDev = false; // Change to false before deployment
  }

  getAllResults(){
    let ep = this.prepEndpoint('standings/all/2');
    return this.http.get(ep)
        .map(res => res.json());
  }

  getTeamResults(team){
    let ep = this.prepEndpoint('standings/team/'+team+"/2");
    return this.http.get(ep)
        .map(res => res.json());
  }

  saveGame(report, reporter){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('standings/result');
    let date = new Date().getTime()

    report = {
      season:2,
      reporter: reporter,
      result: report,
      date: date
    }
    this.http.post(ep, report, { headers: headers })
     .map((res) => res.json()).subscribe(res => {
       this.result = res;
     });
  }

  prepEndpoint(ep){
    if(!this.isDev){
      return ep;
    } else {
      return 'http://localhost:8080/'+ep;
    }
  }
}
