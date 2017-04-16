import * as _ from "lodash";
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string, type: any): any {
      if (query) {
          console.log(type);
          return _.filter(array, item=>item[type].indexOf(query) > -1);
      }
      return array;
  }

}
