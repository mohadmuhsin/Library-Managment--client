import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { ProfileComponent } from './components/profile/profile.component';
import { adminGuard } from './guard/admin.guard';
import { BooksDetailsComponent } from './components/books-details/books-details.component';
import { AddBooksComponent } from './components/add-books/add-books.component';
import { EditBooksComponent } from './components/edit-books/edit-books.component';

const routes: Routes = [
  { path: '', canActivate:[adminGuard], component: BooksComponent},
  {path:"book_details/:id", canActivate:[adminGuard],component:BooksDetailsComponent},
  {path:"add_book", canActivate:[adminGuard], component: AddBooksComponent},
  {path:"edit_book/:id", canActivate:[adminGuard], component: EditBooksComponent},
  { path: 'profile', canActivate:[adminGuard], component: ProfileComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
