import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  borrowed:boolean = false  
  books:any
constructor(
  private service:UserService
){}
  ngOnInit(): void {
    this.getBooks()
  }

  getBooks(){
    this.service.getBooks().subscribe({
      next:(res:any)=>{
        this.books = res.books
        console.log(res,"hloooo");
        this.books = res.books.map((book: { _id: any; }) => {
          const recordItem = res.record.find((item: { book: any; }) => item.book === book._id);
        
          return {
            ...book,
            ...(recordItem && {
              recordId:recordItem._id,
              isBorrowed: recordItem.isBorrowed,
              isReturned: recordItem.isReturned,
            }),
          };
          
        });
        console.log(this.books);

      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


  borrow(id:string){
    console.log(id,"id nddd");
    
    this.service.borrowBook(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.getBooks()
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
        this.getBooks()
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
