import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


import { Agorespace } from '../interface/agorespace';
import { AGORESPACES_DATA } from '../data/mock-agora';


@Injectable({
  providedIn: 'root'
})
export class AgorespaceService {

  private agorespacesUrl = 'api/agorespaces';  // URL to web api

  constructor(
    private http: HttpClient,
  ) { }

  /*getAgorespaces(): Observable<Agorespace[]> {
    const agorespaces = of(AGORESPACES_DATA);
    //this.messageService.add('HeroService: fetched heroes');
    return agorespaces;
  }*/

  //I convert that method to use HttpClient 

/** GET agorespaces from the server */
getAgorespaces(): Observable<Agorespace[]> {
  return this.http.get<Agorespace[]>(this.agorespacesUrl)
    .pipe(
      tap(_ => this.log('fetched agorespaces')),
      catchError(this.handleError<Agorespace[]>('getAgorespaces', []))
    );
}

/** GET agora by id. Will 404 if id not found */
getAgora(id: number): Observable<Agorespace> {
  const url = `${this.agorespacesUrl}/${id}`;
  return this.http.get<Agorespace>(url).pipe(
    tap(_ => this.log(`fetched agorespace id=${id}`)),
    catchError(this.handleError<Agorespace>(`getAgorespace id=${id}`))
  );
}

/** PUT: update the agora on the server */
updateAgora(agora: Agorespace): Observable<any> {
  return this.http.put(this.agorespacesUrl, agora, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${agora.id}`)),
    catchError(this.handleError<any>('updateAgora'))
  );
}

/** POST: add a new agora to the server */
addAgora(agora: Agorespace): Observable<Agorespace> {
  return this.http.post<Agorespace>(this.agorespacesUrl, agora, this.httpOptions).pipe(
    tap((newHAgora: Agorespace) => this.log(`added hero w/ id=${newHAgora.id}`)),
    catchError(this.handleError<Agorespace>('addAgora'))
  );
}

/** DELETE: delete the agora from the server */
deleteAgora(id: number): Observable<Agorespace> {
  const url = `${this.agorespacesUrl}/${id}`;

  return this.http.delete<Agorespace>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted agora id=${id}`)),
    catchError(this.handleError<Agorespace>('deleteAgora'))
  );
}

/* GET agorespaces whose name contains search term */
searchAgora(term: string): Observable<Agorespace[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Agorespace[]>(`${this.agorespacesUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found agoreapces matching "${term}"`) :
       this.log(`no agorespaces matching "${term}"`)),
    catchError(this.handleError<Agorespace[]>('searchAgorespaces', []))
  );
}

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

 /** Log a HeroService message with the MessageService */
 private log(message: string) {
  //this.messageService.add(`AgoraService: ${message}`); //To implemente after
}

 
}
