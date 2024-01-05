import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.css']
})
export class BooksDetailsComponent implements OnInit {
  book_id!:string| null
  bookData!:any
  Data!:any
  searchQuery!:string
  status: string[] = ["Returned","Borrowed"]
  constructor(
    private service: AdminService,
    private activeRoute: ActivatedRoute,

  ){}
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.book_id = params.get('id');
    })

    this.bookDetails(this.book_id)
  }
  
  bookDetails(id:string|null){
    this.service.getBookDetails(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.bookData = res.bookData
        this.Data = this.bookData
      }
    })
  }
 

  borrowed() {
    this.Data = this.bookData.filter((item: any) => item.isBorrowed === true);
    console.log(this.Data);
  }
  

  returned(){
    this.Data = this.bookData.filter((item: any) => item.isReturned === true);
    console.log(this.Data);
  }
  
}
