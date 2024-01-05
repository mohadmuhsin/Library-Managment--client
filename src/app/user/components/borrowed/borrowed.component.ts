import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-borrowed',
  templateUrl: './borrowed.component.html',
  styleUrls: ['./borrowed.component.css']
})
export class BorrowedComponent implements OnInit{
  books!:any
  searchQuery:string = ""
  constructor(
    private service:UserService
  ){}
  ngOnInit(): void {
    this.borrwoedBooks()
  }


  search(){
    if (this.searchQuery.trim() !== '') {
      this.books = this.books.filter((book: any) =>
      book.book.name.toLowerCase().includes(this.searchQuery.toLowerCase())  
     )
   this.books.length === 0
   } else {
     this.borrwoedBooks()
   }
  }

  borrwoedBooks(){
    this.service.getBorrwoedBooks().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.books = res.books
      },
      error:(err)=>{
        console.log(err);  
      }
    })
  }

  return(id:string){
    this.service.returnBook(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.borrwoedBooks()
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
