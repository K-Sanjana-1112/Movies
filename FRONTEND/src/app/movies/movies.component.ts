import { Component, inject } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../model/movie';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  movieService=inject(MovieService)
  movies:Movie[]=[];
  
 
  router=inject(Router)
 

  ngOnInit(): void {
 
    this.movieService.getMovies().subscribe({
     next:(res)=>{
      this.movies=res.getMovies.movies
      
    
      // this.movieCounts = new Array(this.movies.length).fill(0);
     }
     
     
    })
       
    
  }

  bookTicket(name){
    let moviename=encodeURIComponent(name)
    this.router.navigate([`/bookTicket/${moviename}`]);
    
  }

  

}
