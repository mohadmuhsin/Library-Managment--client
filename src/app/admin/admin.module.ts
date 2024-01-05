import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { BooksComponent } from './components/books/books.component';
import { AddBooksComponent } from './components/add-books/add-books.component';
import { EditBooksComponent } from './components/edit-books/edit-books.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksDetailsComponent } from './components/books-details/books-details.component';



@NgModule({
  declarations: [
    BooksComponent,
    AddBooksComponent,
    EditBooksComponent,
    ProfileComponent,
    BooksDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class AdminModule { }
