import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionShortner'
})
export class DescriptionShortnerPipe implements PipeTransform {

  transform(value: any, limit:any): unknown {
    if(value.length>limit){
      return value.substr(0,limit) + '...' 
    }
    return value;
  }

}
