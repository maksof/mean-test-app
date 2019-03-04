import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';  
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule,MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// Services
import { AppService } from './app.service';
import { SharedService } from './shared.service';
import { CommonService } from './common.service';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserDashComponent } from './user-dash/user-dash.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdminAddCategoryComponent } from './admin-add-category/admin-add-category.component';
import { AdminAddMoviesComponent } from './admin-add-movies/admin-add-movies.component';
import { UserSuggestionsComponent } from './user-suggestions/user-suggestions.component';
import { ViewGradesComponent } from './view-grades/view-grades.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SuggestMovieComponent } from './suggest-movie/suggest-movie.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserDashComponent,
    LoginComponent,
    SignUpComponent,
    AdminDashComponent,
    AdminAddCategoryComponent,
    AdminAddMoviesComponent,
    UserSuggestionsComponent,
    ViewGradesComponent,
    MovieListComponent,
    SuggestMovieComponent,
    FavoritesComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    HttpModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    ChartsModule,
    MatTooltipModule,
    MatTreeModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signUp', component: SignUpComponent },
      { path: 'forgotPassword', component: ForgotPasswordComponent },
      // User
      { path: 'dashboard', component: UserDashComponent },
      { path: 'suggest-movie', component: SuggestMovieComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'movies', component: MovieListComponent },
      // Admin
      { path: 'admin', component: AdminDashComponent },
      { path: 'add-categories', component: AdminAddCategoryComponent },
      { path: 'add-movies', component: AdminAddMoviesComponent },
      { path: 'suggested-movies', component: UserSuggestionsComponent },
      { path: 'view-grades', component: ViewGradesComponent },
      ]),
  ],
  providers: [AppService, SharedService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
