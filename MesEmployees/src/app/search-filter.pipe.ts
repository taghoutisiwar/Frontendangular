import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

 /*  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  } */
  transform(list: any[], filterText: string): any {
    console.log('transforming..');
    return list ? list.filter(item =>
    item.nom.toLowerCase().includes(filterText)) : [];
    }
}