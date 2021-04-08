import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'position'
})
export class PositionPipe implements PipeTransform {

  transform(value: string): unknown {
    switch(value){
      case 'gk':
        return 'Goalkeeper'
      case 'rb':
        return 'Right Back'
      case 'cb':
        return 'Centre Back'
      case 'lb':
        return 'Left Back'
      case 'rwb':
        return 'Right Wing Back'
      case 'lwb':
        return 'Left Wing Back'
      case 'cdm':
        return 'Centre Defensive Midfielder'
      case 'cm':
        return 'Centre Midfielder'
      case 'cam':
        return 'Centre Attacking Midfielder'
      case 'rm':
        return 'Right Midfielder'
      case 'lm':
        return 'Left Midfielder'
      case 'rw':
        return 'Right Wing'
      case 'lw':
        return 'Left Wing'
      case 'cf':
        return 'Centre Forward'
      case 'st':
        return 'Striker'

    }
  }

}
