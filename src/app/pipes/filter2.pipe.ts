import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter2'
})
export class Filter2Pipe implements PipeTransform {

  transform(items: any[], value: string, prop: string): any[] {
        if (!items) return [];
        if (!value) return items;

        return items.filter(singleItem =>
            singleItem[prop].toLowerCase().startsWith(value.toLowerCase())
        );
   
    }

}
