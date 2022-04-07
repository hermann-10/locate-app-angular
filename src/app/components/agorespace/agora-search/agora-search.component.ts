import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Agorespace } from 'src/app/shared/interface/agorespace';
import { AgorespaceService } from 'src/app/shared/services/agorespace.service';

@Component({
  selector: 'app-agora-search',
  templateUrl: './agora-search.component.html',
  styleUrls: ['./agora-search.component.css']
})
export class AgoraSearchComponent implements OnInit {

  agorespaces: Agorespace[] = [];
  agorespaces$!: Observable<Agorespace[]>; //Notice the declaration of agorespaces$ as an Observable:


  private searchTerms = new Subject<string>(); //The searchTerms property is an RxJS Subject.

  //A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject as you would any Observable.
  //You can also push values into that Observable by calling its next(value) method as the search() method does.

  constructor(private agoraService: AgorespaceService) { }

   // Push a search term into the observable stream.
   search(term: string): void {
    this.searchTerms.next(term);
  }

  //Passing a new search term directly to the searchAgorespaces() after every user keystroke would create an excessive amount of HTTP requests, taxing server resources and burning through data plans.
  //Instead, the ngOnInit() method pipes the searchTerms observable through a sequence of RxJS operators that reduce the number of calls to the searchAgorespaces(), ultimately returning an observable of timely agora search results (each a Agorespace[]).
  
  ngOnInit(): void {
    this.agorespaces$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.agoraService.searchAgora(term)),
    );
  }

  delete(agora: Agorespace): void {
    this.agorespaces = this.agorespaces.filter(h => h !== agora);
    this.agoraService.deleteAgora(agora.id).subscribe();
  }
}
