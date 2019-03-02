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
	user = {firstName:'' ,lastName:'' ,Email:'', mobileNumber:"" ,username:'' ,password:'' ,confirmPassword:''};

	constructor(public sharedService:SharedService, public notificationService:NotificationsService, public commonService:CommonService) { }
	public data : any;
	ngOnInit() {
	}
	registerUser(){
		console.log(this.user);
		 if (this.commonService.required(this.user.firstName) && this.commonService.required(this.user.lastName) && this.commonService.required(this.user.Email) && this.commonService.required(this.user.username) && this.commonService.required(this.user.password) && this.commonService.required(this.user.confirmPassword)) {
		
		 	if(this.commonService.checkValidEmail(this.user.Email)){
				
				if(this.commonService.checkValidMobileNumber(this.user.mobileNumber)) {

					if (this.commonService.matchPassword(this.user)) {
					
					}else{
						alert('not match');
					}
					
				}else{
					this.notificationService.error('Error','Invalid mobilenumber');
				}
		 	}else{
		 		this.notificationService.error('Error','Invalid email');
			}
		 }else{
		 	this.notificationService.error('Error','Please fill all the required fields');
		}

		// this.sharedService.registerUser(this.user).subscribe(res =>{
		// 	this.data = res.data;
		// 	console.log(res);
		// 	this.notificationService.success("Success", "Successfully login");
		// },(error)=>{
		// 	this.notificationService.error("Error", "Internal Server Error.");
		// })
	}
}
