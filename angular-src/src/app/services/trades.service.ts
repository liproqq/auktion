import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TradesService {
  isDev:boolean;
  bid: any;
  result: any;

  constructor(private http:Http) {
    this.isDev = false; // Change to false before deployment
 }

  getAllTrades(){
    let ep = this.prepEndpoint('trades/all');
    return this.http.get(ep)
        .map(res => res.json());
  }

  submitTrade(trade){
        
  }


  prepEndpoint(ep){
    if(!this.isDev){
      return ep;
    } else {
      return 'http://localhost:8080/'+ep;
    }
  }
}
