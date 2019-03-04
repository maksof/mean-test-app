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
	signupObj:any = {};

	constructor(public sharedService:SharedService, public notificationService:NotificationsService, public commonService:CommonService) { }

	public data : any;

	ngOnInit() {
	}
	registerUser(){
		 if (this.commonService.required(this.signupObj.firstName) && this.commonService.required(this.signupObj.lastName) && this.commonService.required(this.signupObj.Email) && this.commonService.required(this.signupObj.username) && this.commonService.required(this.signupObj.password) && this.commonService.required(this.signupObj.confirmPassword)) {
		
		 	if(this.commonService.checkValidEmail(this.signupObj.Email)){
				
				if(this.commonService.checkValidMobileNumber(this.signupObj.mobileNumber)) {

					if (this.signupObj.password != this.signupObj.confirmPassword) {
						this.notificationService.error('Error','Password not matched');
					}else{
						this.sharedService.registerUser(this.signupObj).subscribe(res =>{
						this.data = res.data;
						this.notificationService.success("Success", "Successfully login");
						},(error)=>{
						this.notificationService.error("Error", "Internal Server Error.");
						})
					}
					
				}else{
					this.notificationService.error('Error','Please enter a valid mobile number of 10 digits');
				}
			}else{
		 		this.notificationService.error('Error','Please enter a valid email address');
			}
		 }else{
		 	this.notificationService.error('Error','Please fill all the required (*) fields.');
		}
	}
}
