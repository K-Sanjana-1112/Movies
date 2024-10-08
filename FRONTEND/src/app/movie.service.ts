import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  httpClient = inject(HttpClient);
  bookingData: any;
  setBookingData(data: any) {
    this.bookingData = data;
  }

  createMovie(movieObj):Observable<any>{
    let token=localStorage.getItem('token') 
   const headers = {'Authorization':`Bearer ${token}`}
    return  this.httpClient.post<any>('http://localhost:3000/api/v1.0/moviebooking/addMovie',movieObj,{headers:new HttpHeaders(headers)});
  }

  getMovies(): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/api/v1.0/moviebooking/all`)
  }
  

  bookTickets(data): Observable<any> {
    
    return this.httpClient.post<any>(`http://localhost:3000/api/v1.0/moviebooking/bookTicket`,data)
  }

  displayMovieById(moviename){
    let token=localStorage.getItem('token') 
    const headers = {'Authorization':`Bearer ${token}`}
    return this.httpClient.get<any>(`http://localhost:3000/api/v1.0/moviebooking/movies/search/${moviename}`,{headers:new HttpHeaders(headers)})

  }

  updateStatus(movieName:string,ticket:number): Observable<any> {
    let tickets=ticket

    return this.httpClient.post(`http://localhost:3000/api/v1.0/moviebooking/update/${movieName}`,{tickets})
  }

  deleteMovie(movieName:string){
    let token=localStorage.getItem('token') 
    const headers = {'Authorization':`Bearer ${token}`}

    return this.httpClient.delete(`http://localhost:3000/api/v1.0/moviebooking/${movieName}/delete`,{headers:new HttpHeaders(headers)})

  }

}
