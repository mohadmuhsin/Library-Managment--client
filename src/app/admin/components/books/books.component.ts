import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent  implements OnInit{
  books!:any
  searchQuery!:string
  noResultsFound:boolean = false
  constructor(private service:AdminService){}
  ngOnInit(): void {
    this.getBooks()
  }
  search(){
    if (this.searchQuery.trim() !== '') {
      this.books = this.books.filter((book: any) =>
      book.name.toLowerCase().includes(this.searchQuery.toLowerCase())  
     )
     this.noResultsFound = this.books.length === 0
   } else {
     this.getBooks()
     this.noResultsFound = false
   }
  }


  getBooks() {
    this.service.getBooks().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.books = res.books
      },error:(err)=>{
        console.log(err); 
      }
    })
  }
}
