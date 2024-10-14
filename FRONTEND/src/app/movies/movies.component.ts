import { Component, Inject, inject } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../model/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  movieService=inject(MovieService)
  movies:Movie[]=[];
  
 
  router=inject(Router)
  toast=inject(NgToastService)
  status: boolean=false;
  userService=inject(UserService)
  isUser: boolean;
 
 

  ngOnInit(): void {
 
    this.movieService.getMovies().subscribe({
     next:(res)=>{
      this.movies=res.getMovies.movies
      
    
      // this.movieCounts = new Array(this.movies.length).fill(0);
     }
     
    
     
    })

    this.userService.getLoginType().subscribe(
      (res)=>{
      this.isUser=res==='user';
      })

     this.userService.getUserLoginStatus().subscribe({
      next:(userLoginStatus)=>this.status=userLoginStatus
     })
     
       
    
  }
  
  login(){
    
   this.router.navigate(['/login'])
   
   Swal.fire({
    title:'Info',
    text:'Can you please Login to View More',
    icon:'info',
    position:'center',
    timer:4000,
    confirmButtonText:'OK'
  })

    

  }

  bookTicket(name){
 
    this.router.navigate([`/bookTicket/${name}`]);
    
  }

  

}
