import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})


export class AddBooksComponent implements OnInit {
  formData!:FormGroup
  imageUrl!: any;
  alert:boolean =false
constructor(
  private formBuilder:FormBuilder,
  private service:AdminService,
  private router:Router,
){
  
}
ngOnInit(): void {
  this.formData = this.formBuilder.group({
    name:['',[Validators.required,Validators.minLength(1), Validators.pattern(/^\S.*\S$/)]],
    // image: ["",[Validators.required]],
    cost: ['',[Validators.required, Validators.minLength(1)]],
    count: ['',[Validators.required, Validators.minLength(1)]]
  })
}
submit() {
  if (this.formData.valid) {
    let data = this.formData.getRawValue();
    data = { ...data, image: this.imageUrl }; 
    console.log(data);

    this.service.addBook(data).subscribe({
      next: (res) => {
        this.alert = true;
        console.log(res);
        setTimeout(() => {
          this.alert = false;
          this.router.navigate(['/admin']);
        }, 2000);
      },
      error: (err) => {
        console.log(err);
      }
    });
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
});
