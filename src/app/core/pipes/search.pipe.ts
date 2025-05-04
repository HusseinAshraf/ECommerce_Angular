import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(productsSearch:any[] , term:string): any[] {
    return productsSearch.filter((item)=> item.title.toLowerCase().includes(term.toLowerCase()) );
  }

}
