import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-books',
  templateUrl: './edit-books.component.html',
  styleUrls: ['./edit-books.component.css']
})
export class EditBooksComponent implements OnInit {
  formData!:FormGroup;
  alert:boolean =  false
  imageUrl!:any
  book_id!: string | null;
  condition:boolean = false
  bookData!:any
  alterType!: string;
  alterMessage!:string
  constructor(
    private service: AdminService,
    private activeRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private router:Router
  ){}
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.book_id = params.get('id');

    })
    
    this.formData = this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(1), Validators.pattern(/^\S.*\S$/)]],
      // image: [null,[Validators.required]],
      cost: ['',[Validators.required, Validators.minLength(1)]],
      count: ['',[Validators.required, Validators.minLength(1)]]
    })

      this.service.getBookDataDetails(this.book_id).subscribe({
        next:(res:any)=>{
          this.bookData = res.bookData
          this.imageUrl = res.image
          this.formData.patchValue({
            name: res.bookData.name,
            
            // image: res.bookData.image,
            cost: res.bookData.cost,
            count: res.bookData.count,
            
          })
          // this.Data = this.bookData
        }
      })
  }
  submit(){
    let data
    data = this.formData.getRawValue()
    console.log(data);
   
    if (data.name === this.bookData.name &&
      data.cost === this.bookData.cost &&
      data.count === this.bookData.count &&
      data.image === this.bookData.image
      ){
        this.alert = true
        this.alterType = "Warning"
        this.alterMessage = "No changes made in the data"
      }else{
        data = { ...data, imagePath: this.imageUrl, id:this.book_id, }; 
        console.log(data);
        this.service.editBook(data).subscribe({
          next:(res)=>{
            this.alert = true
            console.log(res);
            setTimeout(() => {
              this.alert = false
              this.router.navigate(['/admin'])
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
});
