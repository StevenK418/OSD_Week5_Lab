
import { PeopleService } from '../../services/people.service';
import { People } from '../../model/people.model';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-person',
  templateUrl: 'create-person.component.html'
})
export class CreatePersonComponent  {

  constructor(private peopleService: PeopleService, private router: Router) { }


  onSubmit(submittedForm: { value: { lastname: any; firstname: any; phone: any; }; invalid: any; }) {
    if (submittedForm.invalid) {
      return;
    }
    const people: People = {id: uuid.v4(), lastname: submittedForm.value.lastname,firstname: submittedForm.value.firstname, phone: submittedForm.value.phone};
    this.peopleService.createPerson(people).subscribe(result => {
      this.router.navigateByUrl('/people');
    });
  }
}
