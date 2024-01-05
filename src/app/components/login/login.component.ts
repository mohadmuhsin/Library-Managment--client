import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData!:FormGroup;
  user!: SocialUser;
  role:string = ""
  alertMessage!:string;
  alertTYpe!:string;  
  alert:boolean = false;
  condition: boolean = true
  userdata!: {  };
  passwordPattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  

  constructor(
    private router :Router,
    private formBuilder:FormBuilder,
    private service : AuthServiceService,
    private authService: SocialAuthService,
    private ngxCookieService: CookieService

    ){}

ngOnInit(): void {
  this.formData = this.formBuilder.group({
    username:["",[Validators.required, Validators.minLength(3)]],
    password:["",[Validators.required,Validators.minLength(8), Validators.pattern(this.passwordPattern)]]
  })

  this.authService.authState.subscribe((user) => {
    this.user = user;
    if (this.user) {
      this.userdata = { 
        password : this.user.id, 
        username : this.user.name
      }
      this.googleLogin()
    }
  });
}

selectRole(role: string): void {
  console.log(`Selected role: ${role}`);
  this.role = role;
}

googleLogin(){

  if(this.role == ""){
    this.alert = true
    this.condition = false
    this.alertTYpe = "Warning alert!"
    this.alertMessage = "Please choose your role";

  }else{
    console.log(this.userdata);
    
    this.userdata = { role:this.role, ...this.userdata}
    this.service.login(this.userdata,true).subscribe({
      next:(res:any)=>{
        if(res.user.role === "user"){
          localStorage.setItem('jwt', res.token.accessToken)
          this.ngxCookieService.set('jwt', res.token.accessToken, 1)
          this.ngxCookieService.set('rtkn', res.token.refreshToken, 7)
          this.router.navigate(['/user'])
        } else if(res.user.role === "admin"){
          localStorage.setItem('adJwt', res.token.accessToken)
          this.ngxCookieService.set('adJwt', res.token.accessToken, 1)
          this.ngxCookieService.set('adRtkn', res.token.refreshToken, 7)
          this.router.navigate(['/admin'])
        }
        console.log(res,"resp");
        this.alert = true
        this.condition = true
        this.alertTYpe = "Success alert!"
        this.alertMessage = res.message;
        setTimeout(() => {
          this.alert = false;
        }, 5000);
      },
      error:(err:any)=>{
        console.log(err);
        this.alert = true
        this.condition = false
        this.alertTYpe = "Warning alert!"
        this.alertMessage = err.error.message;
        setTimeout(() => {
          this.condition = false
          this.alert = false;
        }, 5000);
      }
    })
  }
}

login(){

  if (this.role === "") {
    this.alert = true;
    this.condition = false;
    this.alertTYpe = "Warning alert!";
    this.alertMessage = "Please choose your role";

  } else if(this.formData.valid){

    let authData = this.formData.getRawValue()
    authData = { role: this.role, ...authData }
    this.service.login(authData, false).subscribe({
      next:(res:any)=>{

        if(res.user.role === "user"){
          localStorage.setItem('jwt', res.token.accessToken)
          this.ngxCookieService.set('jwt', res.token.accessToken, 1)
          this.ngxCookieService.set('rtkn', res.token.refreshToken, 7)
          this.router.navigate(['/'])
        } else if(res.user.role === "admin"){
          localStorage.setItem('adJwt', res.token.accessToken)
          this.ngxCookieService.set('adJwt', res.token.accessToken, 1)
          this.ngxCookieService.set('adRtkn', res.token.refreshToken, 7)
          this.router.navigate(['/admin'])
        }
        console.log(res);
        this.alert = true
        this.condition = true
        this.alertTYpe = "Success alert!"
        this.alertMessage = res.message;
        setTimeout(() => {
          this.alert = false;
        }, 1000);
      },
      error:(error:any)=>{
        console.log(error);
        this.alert = true
        this.condition = false
        this.alertTYpe = "Warning alert!"
        this.alertMessage = error.error.message;
        setTimeout(() => {
          this.alert = false;
        }, 5000);
      }
    })

  }else{
    this.alert = true
    this.condition = false
    this.alertTYpe = "Warning alert!"
    this.alertMessage = "Feilds can't be empty";
    // setTimeout(() => {
    //   this.alert = false;
    // }, 5000);
  }
}
}
