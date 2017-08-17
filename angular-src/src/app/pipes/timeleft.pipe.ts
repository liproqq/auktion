import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeleft'
})
export class TimeleftPipe implements PipeTransform {
  timeleft:String;

  transform(timeBid: number):any {
    let dayAgo= (Date.now()/1)-1000*60*60*24;
    let s = (timeBid - dayAgo); //how much time is left in milliseconds
    if(!s){
      return "-"
    }
    if(s<0 && timeBid){
      return "signed"
    }

    function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return pad(hrs, 2) + ':' + pad(mins, 2) + ':' + pad(secs, 2);

    /*

    if(elapsed>60*60*12){
      this.timeleft ="12h+"
    } else if(elapsed>60*60*6){
      this.timeleft ="6h+"
    } else if(elapsed>60*60){
      this.timeleft ="1h+"
    } else if(elapsed>60*30){
      this.timeleft ="30m+"
    } else if(elapsed>60*10){
      this.timeleft ="10m+"
    } else if(elapsed>60*5){
      this.timeleft ="5m+"
    } else if(elapsed>60*1){
      this.timeleft ="1m+"
    } else if(elapsed<60*1 && elapsed>0){
      this.timeleft ="<1m"
    } else if(elapsed<0){
      this.timeleft ="signed"
    }



    return this.timeleft;*/
  }

}
