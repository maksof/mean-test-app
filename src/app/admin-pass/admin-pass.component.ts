import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {CommonService} from '../common.service';
import {NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';

@Component({
	selector: 'app-admin-pass',
	templateUrl: './admin-pass.component.html',
	styleUrls: ['./admin-pass.component.css']
})
export class AdminPassComponent implements OnInit {

	constructor(public sharedService:SharedService, public notificationService:NotificationsService, public commonService:CommonService) { }

	// Variables
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
	changePassword(){
		if (this.commonService.required(this.updatePassword.Password) && this.commonService.required(this.updatePassword.old) && this.commonService.required(this.updatePassword.confirmPassword)) {
			if (this.updatePassword.Password.length >= 6) {
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
			}else this.notificationService.error("Error","Password should be atleast 6 digits.");
		}else this.notificationService.error("Error","Please fill all the required (*) fields.");
	}
}
