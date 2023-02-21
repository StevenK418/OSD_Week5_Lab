import { CreatePersonComponent } from './addressbook/components/create-person/create-person.component';
import { PeopleListComponent } from './addressbook/components/people-list/people-list.component';
import { PeopleModule } from './addressbook/model/people.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PeopleService } from './addressbook/services/people.service'; //added for vanilla

const routes = [
  {
    path: 'people',
    component: PeopleListComponent
  },
  {path: 'create-entry', component: CreatePersonComponent},
  {path: '**', redirectTo: 'people'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PeopleModule,

    RouterModule.forRoot(routes),
  ],
  providers: [PeopleService],  //added for vanilla
  bootstrap: [AppComponent]
})
export class AppModule { }
