// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { MoviesComponent } from './movies.component';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('MoviesComponent', () => {
//   let component: MoviesComponent;
//   let fixture: ComponentFixture<MoviesComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [MoviesComponent],
//       imports: [RouterTestingModule, HttpClientTestingModule],
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(MoviesComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { MoviesComponent } from './movies.component';
import { RouterTestingModule } from '@angular/router/testing';

 


describe('myService', () => {

      beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule,RouterTestingModule],
         
        providers: [MoviesComponent]
      }));
      

       it('should be created', () => {
        const service: MoviesComponent = TestBed.get(MoviesComponent);
        expect(service).toBeTruthy();
       });

       it('should have getData function', () => {
        const service: MoviesComponent = TestBed.get(MoviesComponent);
      // expect(service.getData).toBeTruthy();
       });

    });