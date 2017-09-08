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
    let ep = this.prepEndpoint('standings/all');
    return this.http.get(ep)
        .map(res => res.json());
  }

  saveGame(report, reporter){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('standings/result');

    report = {
      season:0,
      reporter: reporter,
      result: report,
      date: Date()
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
