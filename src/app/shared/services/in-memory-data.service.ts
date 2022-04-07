import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Agorespace } from '../interface/agorespace';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const agorespaces = [
      { id: 1, name: 'Renens Agora', address: 'Chemin de la tour 10, 1020 Renens', createdAt: new Date(Date.now()) },
      { id: 2, name: 'Crissier Agora', address: 'Chemin des nouilles 3, 1003 Crissier', createdAt: new Date(Date.now()) },
      { id: 3, name: 'Ouchy Agora', address: 'Avenue des mouches, 1004 Ouchy', createdAt: new Date(Date.now()) },
      { id: 4, name: 'Prilly Agora', address: 'Avenue de la trelle 7, 1007 Prilly', createdAt: new Date(Date.now()) },
    
    ];
    return {agorespaces};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the agorespaces array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // agora id + 1.
  genId(agorespaces: Agorespace[]): number {
    return agorespaces.length > 0 ? Math.max(...agorespaces.map(agora => agora.id)) + 1 : 11;
  }

}