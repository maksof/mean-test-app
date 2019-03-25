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
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Directives
import { OnlyNumber } from './directives/number.only.directive';
import { OnlyNumberNoDecimal } from './directives/no.decimal.directive';
import { MaxNumber } from './directives/minMax.validator.directive';
import { AlphaNumeric } from './directives/alpha.numeric.directive';

// Services
import { AppService } from './app.service';
import { SharedService } from './shared.service';
import { CommonService } from './common.service';
import { AuthGuardService } from './auth.guard.service';

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
import { SettingComponent } from './setting/setting.component';
import { AdminPassComponent } from './admin-pass/admin-pass.component';

@NgModule({
  declarations: [
  AppComponent,
  HeaderComponent,
  FooterComponent,
  UserDashComponent,
  LoginComponent,
  OnlyNumber,
  OnlyNumberNoDecimal,
  MaxNumber,
  AlphaNumeric,
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
  SettingComponent,
  AdminPassComponent,
  ],
  imports: [
  BrowserModule,    
  HttpClientModule,
  HttpModule,
  FormsModule,
  NgxChartsModule,
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
    { path: 'dashboard', component: UserDashComponent, canActivate: [AuthGuardService] },
    { path: 'suggest-movie', component: SuggestMovieComponent, canActivate: [AuthGuardService] },
    { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuardService] },
    { path: 'movies', component: MovieListComponent, canActivate: [AuthGuardService] },
    { path: 'profile', component: SettingComponent, canActivate: [AuthGuardService] },
    // Admin
    { path: 'admin', component: AdminDashComponent, canActivate: [AuthGuardService] },
    { path: 'add-categories', component: AdminAddCategoryComponent, canActivate: [AuthGuardService] },
    { path: 'add-movies', component: AdminAddMoviesComponent, canActivate: [AuthGuardService] },
    { path: 'suggested-movies', component: UserSuggestionsComponent, canActivate: [AuthGuardService] },
    { path: 'view-grades', component: ViewGradesComponent, canActivate: [AuthGuardService] },
    { path: 'admin-profile', component: AdminPassComponent, canActivate: [AuthGuardService] },
    ]),
  ],
  providers: [AuthGuardService, AppService, SharedService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
