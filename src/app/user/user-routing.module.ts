import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { userGuard } from './guard/user.guard';
import { BorrowedComponent } from './components/borrowed/borrowed.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', canActivate:[userGuard], component: HomeComponent},
  { path: 'profile',canActivate:[userGuard], component: ProfileComponent },
  {path:"borrowed",canActivate:[userGuard],component:BorrowedComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class UserRoutingModule { }
