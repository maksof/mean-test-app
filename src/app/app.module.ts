import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';  
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule,MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { SimpleNotificationsModule } from 'angular2-notifications';
// Services
import { AppService } from './app.service';
import { SharedService } from './shared.service';
import { CommonService } from './common.service';
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserDashComponent } from './user-dash/user-dash.component';
import { SettingsComponent } from './settings/settings.component';
import { FeesComponent } from './fees/fees.component';
import { ExcersiceComponent } from './excersice/excersice.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserDashComponent,
    SettingsComponent,
    FeesComponent,
    ExcersiceComponent,
    AttendanceComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
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
      { path: 'dashboard', component: UserDashComponent },
      { path: 'profile', component: SettingsComponent },
      { path: 'fees', component: FeesComponent },
      { path: 'excersice', component: ExcersiceComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signUp', component: SignUpComponent },
      ]),
  ],
  providers: [AppService, SharedService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
