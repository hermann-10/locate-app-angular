import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Agorespace } from '../model/agorespace';
import { AGORESPACES_DATA } from '../data/mock-agora';


@Injectable({
  providedIn: 'root'
})
export class AgorespaceService {

  constructor() { }

  getAgorespaces(): Observable<Agorespace[]> {
    const agorespaces = of(AGORESPACES_DATA);
    //this.messageService.add('HeroService: fetched heroes');
    return agorespaces;
  }

  getAgora(id: number): Observable<Agorespace> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const agora = AGORESPACES_DATA.find(h => h.id === id)!;
    //this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(agora);
  }

 
}
