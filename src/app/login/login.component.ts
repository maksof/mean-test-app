import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service';
import {NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginObj:any = {};

  constructor(public notificationService:NotificationsService, public commonService:CommonService) { }

  ngOnInit() {
  }
  login(){
  	if (this.commonService.required(this.loginObj.userName) && this.commonService.required(this.loginObj.password)) {

  		if (this.commonService.checkValidLoginUser(this.loginObj)) {
  			
  		} else {
  			this.notificationService.error('Error','please enter valid username and password');
  		}
  		
  	} else {
  		this.notificationService.error('Error','Please fill all the required (*) fields.');
  	}
  }

}
