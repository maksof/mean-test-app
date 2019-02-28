import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {CommonService} from '../common.service';
import {NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

	constructor(public sharedService:SharedService, public notificationService:NotificationsService, public commonService:CommonService) { }
	userDetails = {fatherName:""};
	public data:any;
	ngOnInit() {
	}
	registerUser(){
		
		this.sharedService.registerUser(this.userDetails).subscribe(res =>{
			this.data = res.data;
			console.log(res);
			this.notificationService.success("Success", "Successfully login");
		},(error)=>{
			this.notificationService.error("Error", "Internal Server Error.");
		})
	}
}
