import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of, observable } from 'rxjs';
import { MessageService } from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes'; //URL to web api
  

  getHeroes(): Observable<Hero[]>{
    //this.mesageService.add('Hero service: fetched heroes');
    //return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
  getHero(id: number): Observable<Hero> {
    //this.messageService.add(`Hero service: fetch hero id=${id}`);
    //return of(HEROES.find(hero => hero.id === id));
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
    .pipe(tap(_ => this.log(`fetched hero id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );

  }
    /** PUT: update the hero on the server */
    updateHero (hero: Hero): Observable<any> {
      return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
    }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      tap((newHero: Hero) => this.log(`added hero w / id=${newHero.id}`) ),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
    .pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes',[]))
    );
  }
  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions)
    .pipe(
      tap(_ => this.log(`delete hero id=${id}`)),
      catchError(this.handleError<Hero>('DeleteHero'))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.body.error}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);

    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
}
