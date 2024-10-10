import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import { MovieService } from '../movie.service';
import { of } from 'rxjs';
import { Movie } from '../model/movie';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let movieServiceMock: jasmine.SpyObj<MovieService>;

  beforeEach(() => {
    // Create a mock for MovieService
    movieServiceMock = jasmine.createSpyObj('MovieService', ['getMovies']);

    TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      providers: [
        { provide: MovieService, useValue: movieServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies on init', () => {
    // Arrange: Create mock movie data
    const mockMovies: Movie[] = [
     
    ];

    // Mock the service method to return the mock movies
    movieServiceMock.getMovies.and.returnValue(of({ getMovies: { movies: mockMovies } }));

    // Act: Call ngOnInit to trigger the data fetch
    component.ngOnInit();

    // Assert: Check that the movies were set correctly
    expect(movieServiceMock.getMovies).toHaveBeenCalled();
    expect(component.movies).toEqual(mockMovies);
  });
});
