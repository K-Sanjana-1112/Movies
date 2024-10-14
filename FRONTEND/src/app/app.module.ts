import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { MoviesComponent } from './movies/movies.component';
import { NgToastModule } from 'ng-angular-popup';
import { FooterComponent } from './footer/footer.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AddMovieComponent,
    BookTicketComponent,
    HeaderComponent,
    MoviesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgToastModule,
    SweetAlert2Module.forRoot()
  
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
