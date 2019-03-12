import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {CommonService} from '../common.service';
import { Router } from '@angular/router'
import {NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

	constructor(public sharedService:SharedService, public notificationService:NotificationsService, public commonService:CommonService, public router:Router) { }

	signupObj:any = {};
	public data : any;
	showLoader:boolean = false;

	ngOnInit() {
	}
	registerUser(){
		if (this.commonService.required(this.signupObj.email) && this.commonService.required(this.signupObj.first_name) && this.commonService.required(this.signupObj.last_name) && this.commonService.required(this.signupObj.phone) && this.commonService.required(this.signupObj.age) && this.commonService.required(this.signupObj.password) && this.commonService.required(this.signupObj.confirmPassword) && this.commonService.required(this.signupObj.gender)) {
			if(this.commonService.checkValidEmail(this.signupObj.email)){
				if(this.commonService.checkValidMobileNumber(this.signupObj.phone)) {
					if (this.checkValidAge(this.signupObj.age)) {
						if (this.signupObj.password != this.signupObj.confirmPassword) {
							this.notificationService.error('Error','Password not matched');
						}else{
							this.showLoader = true;
							var user = JSON.parse(JSON.stringify(this.signupObj));
							delete user.confirmPassword;
							this.sharedService.registerUser(user).subscribe(res =>{
								this.showLoader = false;
								if (res.status == "OK") {
									this.signupObj = {};
									this.notificationService.success("Success", "Successfully Registered.");
								}
							},(error)=>{
								this.showLoader = false;
								this.notificationService.error("Error", "Internal Server Error.");
							});
						}
					}else{this.notificationService.error('Error',"Please Enter a Valid Year")}
				}else{this.notificationService.error('Error','Please enter a valid mobile number of 10 digits');}
			}else{this.notificationService.error('Error','Please enter a valid email address');}
		 }else{this.notificationService.error('Error','Please fill all the required (*) fields.');}
	}

	checkValidAge(age){
		if (age > 100 || age <= 0) return false;
		else return true;
	}
}
