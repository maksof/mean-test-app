import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {CommonService} from '../common.service';
import { Router } from '@angular/router'
import {NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginObj:any = {};

	showLoader:boolean = false;
	constructor(public sharedService:SharedService, public notificationService:NotificationsService, public commonService:CommonService, public route:Router) {
	}

	ngOnInit() {
	}
	loginUser(){
		if (this.commonService.required(this.loginObj.email) && this.commonService.required(this.loginObj.password)) {
			if (this.commonService.checkValidEmail(this.loginObj.email)) {
				this.sharedService.login(this.loginObj).subscribe(res=>{
					this.showLoader = false;
					if (res.status == "OK") {
						var user = "";
						user = JSON.stringify(res.data);
						localStorage.setItem('user',user);
						if (res.data.role == "ADMIN") {
							this.route.navigateByUrl("admin");
						}else if(res.data.role == "USER"){
							this.route.navigateByUrl("dashboard");
						}
						this.loginObj = {};
						this.notificationService.success("Success", "Successfully login");
					}else{
						this.notificationService.info("Info", res.message);
					}
				},(error)=>{
					this.showLoader = false;
					this.notificationService.error("Error", "Internal Server Error.");
				});
			}else{this.notificationService.error('Error','Please enter a valid email address');}
		}else{this.notificationService.error('Error','Please fill all the required (*) fields.');}
	}

}
