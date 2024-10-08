import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrl: './book-ticket.component.css'
})
export class BookTicketComponent implements OnInit {
  activate = inject(ActivatedRoute)
  router = inject(Router)
  movieService = inject(MovieService)
  ticketQuantity: any;
  selectedSeats: [];
  ticket: any;
  movies: any;

  showModal: boolean = false;

  formData = {

    movieName: '',

    theatreName: '',

    numberOfTickets: '',

    seatNumbers: 0

  };

  openForm() {

    this.showModal = true;

  }

  closeForm() {

    this.showModal = false;

  }
  ngOnInit(): void {
    let moviename = this.activate.snapshot.paramMap.get('moviename')
    this.movieService.displayMovieById(moviename).subscribe(
      (s) => {
        this.movies = s.searchMovie.movies[0];
        console.log(s.searchMovie.movies)
      },
      (error) => {
        console.log("Error in displaying", error)
      }
    )

  }

  submitForm() {
 
    let data={
      movieName:this.movies.movieName,
      theatreName:this.movies.theatreName,
      numberOfTickets:this.formData.numberOfTickets,
      seatNumbers:this.formData.seatNumbers
    }
    this.movieService.bookTickets(data).subscribe(
      (res) => {
        console.log(res)
        this.ticket = res.ticket
        this.closeForm()
      },
      (error) => {
        console.error(error);
      }
    )


  }
  calculatePrice(numberOfTickets: any, price: any): number {

    return parseInt(numberOfTickets) * parseInt(price);
  }


}
