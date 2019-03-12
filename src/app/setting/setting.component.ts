import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {CommonService} from '../common.service';
import {NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';

@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html',
	styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

	constructor(public sharedService:SharedService, public notificationService:NotificationsService, public commonService:CommonService) { }

	user = JSON.parse(localStorage.getItem('user'));
	userData:any = this.user;
	showLoader:boolean = false;
	mainToggle:boolean = true;
	updatePassword:any = {};
	ngOnInit() {
	}

	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}

	updateProfile(){
		if (this.commonService.required(this.userData.first_name) && this.commonService.required(this.userData.last_name) && this.commonService.required(this.userData.email) && this.commonService.required(this.userData.age) && this.commonService.required(this.userData.phone)) {
			if(this.commonService.checkValidMobileNumber(this.userData.phone)) {
				if (this.checkValidAge(this.userData.age)) {
					this.showLoader = true;
					this.sharedService.editProfile(this.userData).subscribe(res =>{
						this.showLoader = false;
						if (res.status == "OK") {
							var data = JSON.stringify(this.userData);
							localStorage.setItem('user',data);
							this.notificationService.success("Success", "Profile updated.");
						}
					},(error)=>{
						this.showLoader = false;
						this.notificationService.error("Error", "Internal Server Error, please try again later.");
					});
				}else{this.notificationService.error('Error',"Please enter a valid year.")}
			}else{this.notificationService.error('Error','Please enter a valid mobile number of 10 digits');}
		}else{this.notificationService.error('Error','Please fill all the required (*) fields.');}
	}
	checkValidAge(age){
		if (age > 100 || age <= 0) return false;
		else return true;
	}
	changePassword(){
		if (this.commonService.required(this.updatePassword.Password) && this.commonService.required(this.updatePassword.old) && this.commonService.required(this.updatePassword.confirmPassword)) {
			if (this.updatePassword.Password == this.updatePassword.confirmPassword) {
				this.updatePassword.email = this.userData.email;
				this.showLoader = true;
				this.sharedService.changePassword(this.updatePassword).subscribe(res=>{
					this.showLoader = false;
					if (res.status == "OK") {
						this.updatePassword = {};
						this.notificationService.success("Success","Password Successfully updated.");
					}
				},(error)=>{
					this.showLoader = false;
					this.notificationService.error("Error", "Internal Server Error, please try again later.");
				})
			}else this.notificationService.error("Error","Password Doesn't Match.");
		}else this.notificationService.error("Error","Please fill all the required (*) fields.");
	}
}
