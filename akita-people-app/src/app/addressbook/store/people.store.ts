import { Injectable } from '@angular/core';
import { People } from '../model/people.model';
import { ID, EntityStore, StoreConfig, EntityState } from '@datorama/akita';

export interface PeopleState extends EntityState<People, string> {
  arePeopleLoaded: boolean;
}

export function createInitialState(): PeopleState {
  return {
      arePeopleLoaded: false
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'people' })
export class PeopleStore extends EntityStore<PeopleState> {

    constructor() {
        super(createInitialState());
    }

    loadPeople(people: People[], arePeopleLoaded: boolean) {
      this.set(people);
      console.log(people)
      this.update(state => ({
        ...state, //typescript spread operator, returns all of the elements of the array
        arePeopleLoaded
      }));
    }
}
