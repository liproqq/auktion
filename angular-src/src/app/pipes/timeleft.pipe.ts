import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeleft'
})
export class TimeleftPipe implements PipeTransform {
  timeleft:String;

  transform(timeBid: number):any {
    let dayAgo= (Date.now()/1)-1000*60*60*24;
    let elapsed = (timeBid - dayAgo)/1000; //how much time is left in seconds
    if(!elapsed){
      return "-"
    }

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



    return this.timeleft;
  }

}
