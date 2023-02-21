
import { PeopleService } from '../../services/people.service';

import { tap, switchMap, filter } from 'rxjs/operators';
import { People } from '../../model/people.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-people-list',
  templateUrl: 'people-list.component.html'
})
export class PeopleListComponent implements OnInit {

  personToBeUpdated: People | any;
  isUpdateActivated = false;


 addressBook:People[];

  constructor(private PeopleService: PeopleService) {
  }

  ngOnInit() {
    this.getPeople();
  }

  getPeople() {
    this.PeopleService.getAllPeople().subscribe(
      people => {
        this.addressBook=people;
        console.log("load people over network, sad face..");
      }
    )
  }

  deletePerson(personId: string) {
    this.PeopleService.deletePerson(personId).subscribe(result => {
      this.getPeople();
    });

  }

  showUpdateForm(person: People) {
    this.isUpdateActivated = true;
    this.personToBeUpdated = {...person};
  }


  updatePerson(updateForm: { value: People; }) {
    this.PeopleService.updatePerson(
      this.personToBeUpdated.id, updateForm.value).subscribe(result => console.log(result)

    );
    this.isUpdateActivated = false;
    this.personToBeUpdated = null;
  }


}

