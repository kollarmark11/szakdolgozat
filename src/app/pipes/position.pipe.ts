import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'position'
})
export class PositionPipe implements PipeTransform {

  transform(value: string): unknown {
    switch(value){
      case 'gk':
        return 'Kapus'
      case 'rb':
        return 'Jobb védő'
      case 'cb':
        return 'Középső védő'
      case 'lb':
        return 'Bal védő'
      case 'rwb':
        return 'Jobb szélső védő'
      case 'lwb':
        return 'Bal szélső védő'
      case 'cdm':
        return 'Védekező középső középpályás'
      case 'cm':
        return 'Középső középpályás'
      case 'cam':
        return 'Támadó középpályás'
      case 'rm':
        return 'Jobb középpályás'
      case 'lm':
        return 'Bal középpályás'
      case 'rw':
        return 'Jobb szélső'
      case 'lw':
        return 'Bal szélső'
      case 'cf':
        return 'Középső csatár'
      case 'st':
        return 'Csatár'

    }
  }

}
