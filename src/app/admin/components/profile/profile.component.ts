import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit{
  formData!:FormGroup
  imageUrl!:any
  profileData!:any
  alert: boolean = false
  condition:boolean = false
  alterType!: string;
  alterMessage!:string
  constructor(
    private router:Router,
    private service:AdminService,
    private formBuilder:FormBuilder
  ){}


  ngOnInit(): void {

    this.formData = this.formBuilder.group({
      username:["",Validators.required,],
      // image:["",Validators.required,],
      email:["",Validators.required,]
    })
    this.service.getUserData().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.profileData = res
        this.formData.patchValue( {
          username:res.username,
          email:res.email
        })
      }, 
      error:(err)=>{
        console.log(err);
      }
    })
  }

  editProfile() {

    let data
    data = this.formData.getRawValue()
    
    if(data.username === this.profileData.username &&
      this.imageUrl === this.profileData.image ){
        this.alert = true
        this.alterType = "Warning"
        this.alterMessage = "No changes made in the data"
      }else{
        data = { ...data, image: this.imageUrl }; 
        console.log(data);
        this.service.editProfile(data).subscribe({
          next:(res:any)=>{
            this.alert = true
            this.condition = true
            this.alterMessage = res.message
            this.alterType = "Success Alert!"

            console.log(res);
            setTimeout(() => {
              this.alert = false
              
              this.router.navigate(['/admin/profile'])
            }, 2000);
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
      }
  }

  async onFileSelected(event: any) {
    const selectedFile: File = event.target.files[0];
  
    try {
      const base64Data = await toBase64(selectedFile);
      console.log('Base64 representation:', base64Data);
      this.imageUrl = base64Data
    } catch (error) {
      console.error('Error converting to base64:', error);
    }
    
  }


}

export const toBase64 = (image:File) =>
new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
}).catch((err) => {
  console.log(err);
});
