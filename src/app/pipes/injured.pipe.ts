import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'injured'
})
export class InjuredPipe implements PipeTransform {

  transform(value: any): unknown {
    if(value === true){
      return 'Injured'
    }else if(value === false){
      return 'Not injured'
    }
  }

}
