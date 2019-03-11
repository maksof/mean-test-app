import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service';
import {NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(public notificationService:NotificationsService, public commonService:CommonService) { }

	loginObj:any = {};

	ngOnInit() {
		
	}

}
