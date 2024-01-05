import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  alert:boolean = false;
  condition:boolean = false;
  alterType:string = "";
  alterMessage:string = "";
  formData!:FormGroup;
  imageUrl!:any
  profileData!: any;

  constructor(private service:UserService,
    private formBuilder:FormBuilder,
    private router:Router
    ){}
    @ViewChild('fileInput', { static: false })fileInput!: ElementRef;
  ngOnInit(): void {

    this.formData = this.formBuilder.group({
      username:["",Validators.required,],
      // image:["",Validators.required,],  
      email:["",Validators.required,]
    })

    this.service.getUserData().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.profileData = res.data
        this.formData.patchValue( {
          username:res.data.username,
          email:res.data.email
        })
      }, 
      error:(err)=>{
        console.log(err);
      }
    })
  }
  editProfile(){

    let data
    data = this.formData.getRawValue()
    console.log(data);

    
    if(data.username === this.profileData.username 
    // && this.imageUrl === this.profileData?.image
      ){
        
        this.alert = true
        this.alterType = "Warning"
        this.alterMessage = "No changes made in the data"
      }else{
        data = { ...data, image: this.imageUrl }; 
        this.service.editProfile(data).subscribe({
          next:(res:any)=>{
            this.alert = true
            this.condition = true
            this.alterMessage = res.message
            this.alterType = "Success Alert!"

            console.log(res);
            setTimeout(() => {
              this.alert = false
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