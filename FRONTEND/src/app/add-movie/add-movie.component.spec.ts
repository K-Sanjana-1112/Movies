// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AddMovieComponent } from './add-movie.component';
// import { UserService } from '../user.service';
// import { MovieService } from '../movie.service';
// import { NgToastService } from 'ng-angular-popup';
// import { ReactiveFormsModule } from '@angular/forms';
// import { of, throwError } from 'rxjs';
// import Swal from 'sweetalert2';

// class MockUserService {
//   getCurrentUser() {
//     return of({ lastName: 'Doe' });
//   }

//   getLoginType() {
//     return of('admin');
//   }
// }

// class MockMovieService {
//   getMovies() {
//     return of({ getMovies: { movies: [{ movieName: 'Test Movie' }] } });
//   }

//   createMovie(data: any) {
//     return of({ message: 'Movie added Succesfully' });
//   }
// }

// class MockNgToastService {}

// describe('AddMovieComponent', () => {
//   let component: AddMovieComponent;
//   let fixture: ComponentFixture<AddMovieComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule],
//       declarations: [AddMovieComponent],
//       providers: [
//         { provide: UserService, useClass: MockUserService },
//         { provide: MovieService, useClass: MockMovieService },
//         { provide: NgToastService, useClass: MockNgToastService },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(AddMovieComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize user and movies on ngOnInit', () => {
//     component.ngOnInit();

//     expect(component.user).toBe('Doe');
//     expect(component.login).toBe('admin');
//     expect(component.movies).toEqual([{ movieName: 'Test Movie' }]);
//     expect(component.name).toBe('Test Movie');
//   });

//   it('should return the form control for image', () => {
//     expect(component.image).toBeTruthy();
//   });

//   it('should submit the form and handle success', () => {
//     spyOn(component.movieService, 'createMovie').and.returnValue(of({ message: 'Movie added Succesfully' }));
//     spyOn(Swal, 'fire');

//     component.submit();

//     expect(component.movieService.createMovie).toHaveBeenCalled();
    
//   });

//   it('should handle errors on submit', () => {
//     spyOn(component.movieService, 'createMovie').and.returnValue(throwError({ error: 'Error' }));

//     component.submit();

//     expect(component.displayUserStatus).toBeUndefined();
//   });

//   it('should reset the form', () => {
//     component.onReset();

   
//     expect(component.movie.pristine).toBeTrue();
//     expect(component.movie.untouched).toBeTrue();
//   });
// });