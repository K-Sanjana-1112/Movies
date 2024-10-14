
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { MovieService } from './movie.service';
import { RouterTestingModule } from '@angular/router/testing';

 


describe('myService', () => {

      beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule,RouterTestingModule],
         
        providers: [MovieService]
      }));
      

       it('should be created', () => {
        const service: MovieService = TestBed.get(MovieService);
        expect(service).toBeTruthy();
       });

       it('should have getData function', () => {
        const service: MovieService = TestBed.get(MovieService);
      // expect(service.getData).toBeTruthy();
       });

    });
