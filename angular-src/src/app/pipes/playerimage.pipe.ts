import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playerimage'
})
export class PlayerimagePipe implements PipeTransform {

  transform(player:any): any {
    return "http://www.2kratings.com/wp-content/uploads/"+player.firstName.replace(/\s/g, "-")+"-"+player.lastName.replace(/\s/g, "-")+".png"
  }

}
