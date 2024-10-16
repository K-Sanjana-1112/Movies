// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { MovieService } from './movie.service';

// describe('MovieService', () => {
//   let movieService: MovieService;
//   let httpTestingController: HttpTestingController;

//   // it('should create the service', () => {
//   //   TestBed.configureTestingModule({
//   //     imports: [HttpClientTestingModule],
//   //     providers: [MovieService]
//   //   });
    
//   //   expect(movieService).toBeTruthy();
//   // });

//   it('should create a movie and return response', () => {
//     const mockMovie = { title: 'Inception', director: 'Christopher Nolan', year: 2010 };

//     // Simulate local storage token
//     spyOn(localStorage, 'getItem').and.callFake((key: string) => {
//       if (key === 'token') {
//         return 'mocked-token';
//       }
//       return null;
//     });

//     movieService.createMovie(mockMovie).subscribe(response => {
//       expect(response).toEqual(mockMovie);
//     });

//     const req = httpTestingController.expectOne('http://localhost:3000/api/v1.0/moviebooking/addMovie');
//     expect(req.request.method).toEqual('POST');
//     expect(req.request.headers.get('Authorization')).toEqual('Bearer mocked-token');
//     req.flush(mockMovie); // Simulate server response
//   });

//   it('should get all movies and return response', () => {
//     const mockMovies = [
//       { title: 'Inception', director: 'Christopher Nolan', year: 2010 },
//       { title: 'The Dark Knight', director: 'Christopher Nolan', year: 2008 }
//     ];

//     movieService.getMovies().subscribe(movies => {
//       expect(movies).toEqual(mockMovies);
//     });

//     const req = httpTestingController.expectOne('http://localhost:3000/api/v1.0/moviebooking/all');
   
//     req.flush(mockMovies); // Simulate server response
//   });

//   it('should book tickets and return response', () => {
//     const mockBookingData = { movieName: 'Inception', tickets: 2 };

//     movieService.bookTickets(mockBookingData).subscribe(response => {
//       expect(response).toEqual(mockBookingData);
//     });

//     const req = httpTestingController.expectOne('http://localhost:3000/api/v1.0/moviebooking/bookTicket');
//     expect(req.request.method).toEqual('POST');
//     req.flush(mockBookingData); // Simulate server response
//   });

//   it('should display movie by id and return response', () => {
//     const movieName = 'Inception';
//     const mockMovie = { title: 'Inception', director: 'Christopher Nolan', year: 2010 };

//     // Simulate local storage token
//     spyOn(localStorage, 'getItem').and.callFake((key: string) => {
//       if (key === 'token') {
//         return 'mocked-token';
//       }
//       return null;
//     });

//     movieService.displayMovieById(movieName).subscribe(movie => {
//       expect(movie).toEqual(mockMovie);
//     });

//     const req = httpTestingController.expectOne(`http://localhost:3000/api/v1.0/moviebooking/movies/search/${movieName}`);
//     expect(req.request.method).toEqual('GET');
//     expect(req.request.headers.get('Authorization')).toEqual('Bearer mocked-token');
//     req.flush(mockMovie); // Simulate server response
//   });

//   it('should update movie status and return response', () => {
//     const movieName = 'Inception';
//     const tickets = 2;
//     const mockResponse = { message: 'Status updated successfully' };

//     movieService.updateStatus(movieName, tickets).subscribe(response => {
//       expect(response).toEqual(mockResponse);
//     });

//     const req = httpTestingController.expectOne(`http://localhost:3000/api/v1.0/moviebooking/update/${movieName}`);
//     expect(req.request.method).toEqual('POST');
//     expect(req.request.body).toEqual({ tickets });
//     req.flush(mockResponse); // Simulate server response
//   });

//   it('should delete a movie and return response', () => {
//     const movieName = 'Inception';
//     const mockResponse = { message: 'Movie deleted successfully' };

//     // Simulate local storage token
//     spyOn(localStorage, 'getItem').and.callFake((key: string) => {
//       if (key === 'token') {
//         return 'mocked-token';
//       }
//       return null;
//     });

//     movieService.deleteMovie(movieName).subscribe(response => {
//       expect(response).toEqual(mockResponse);
//     });

//     const req = httpTestingController.expectOne(`http://localhost:3000/api/v1.0/moviebooking/${movieName}/delete`);
//     expect(req.request.method).toEqual('DELETE');
//     expect(req.request.headers.get('Authorization')).toEqual('Bearer mocked-token');
//     req.flush(mockResponse); // Simulate server response
//   });

//   afterEach(() => {
//     httpTestingController.verify(); // Ensure that no unmatched requests are outstanding
//   });
// });
