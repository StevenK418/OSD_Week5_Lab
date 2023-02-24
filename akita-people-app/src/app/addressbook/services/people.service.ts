import { People } from '../model/people.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PeopleStore, PeopleState } from '../store/people.store';
import { EntityStore, EntityState } from '@datorama/akita';


@Injectable()
export class PeopleService {
  http: HttpClient;
  store: PeopleStore;
  // create your own mock api addressbook containing
  // id, lastname, firstname, phone
  apiURL="https://63f76784833c7c9c6083400d.mockapi.io";


  constructor(http: HttpClient, store: PeopleStore) 
  {
    this.http = http;
    this.store = store;
  }

  getAllPeople(): Observable<People[]> {
    return this.http.get<People[]>(this.apiURL+'/api/vi/people/people?sortBy=lastname')
      .pipe(
        tap(people=>this.store.loadPeople(people, true)
        )
      );
  }

  createPerson(person: People): Observable<People> {
    return this.http.post<People>(this.apiURL+'/api/vi/people/people', person).pipe(
      tap(value => {
        // TODO: this needs to be [person] but alas is people
        this.store.add([person])
      })
    );
  }

  deletePerson(personId: string): Observable<any> {
    return this.http.delete(this.apiURL+'/api/vi/people/people/' + personId).pipe(
      tap(result => {
        this.store.remove(personId)
      })
    );
  }

  updatePerson(personId: string, person: People): Observable<any> {
    return this.http.put(this.apiURL+'/api/vi/people/people/' + personId, person).pipe(
      tap(result => {
        this.store.update(personId, person);
      })
    );
  }
}
