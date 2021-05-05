import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'injured'
})
export class InjuredPipe implements PipeTransform {

  transform(value: any): unknown {
    if(value === true){
      return 'Sérült'
    }else if(value === false){
      return 'Nem sérült'
    }
  }

}
