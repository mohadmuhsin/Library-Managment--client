import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  data!:any
  constructor(
    private service:AdminService,
    private ngxCookieService: CookieService,
    private router:Router

  ){}
  ngOnInit(): void {
    // this.service.getUserData().subscribe({
    //   next:(res)=>{
    //     this.data = res
    //   }
    // })
  }
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(){
    this.service.logout().subscribe({
      next:(res:any)=>{
        console.log(res.data);
        
        if(res.data.role === "admin"){
          localStorage.removeItem("adJwt")
          this.ngxCookieService.delete('adJwt')
          this.ngxCookieService.delete('adRtkn')
          this.router.navigate(['/login'])

        }else  if(res.data.role === "user"){
          localStorage.removeItem("jwt")
          this.ngxCookieService.delete('jwt')
          this.ngxCookieService.delete('rtkn')
          this.router.navigate(['/login'])
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })  
  }
}
