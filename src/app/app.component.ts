import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CommonService } from './common.service'
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	constructor(public commonService:CommonService, public route:Router) {}
	public options = {
		position: ["bottom", "left"],
		theClass:'angular_notification',
		showProgressBar: true,
		pauseOnHover: true,
		clickToClose: true,
		clickIconToClose: true,
		lastOnBottom: true,
		timeOut: 5000,
	}
	ngOnInit(){
		this.checkIfLogggedIn();
	}
	checkIfLogggedIn(){
		var user = JSON.parse(localStorage.getItem('user'));
		if (!this.commonService.required(user)) this.route.navigateByUrl("/login");
		else{
			if (user.role == "USER") this.route.navigateByUrl("dashboard");
			else if(user.role == "ADMIN")this.route.navigateByUrl("/admin");
		}
	}
	changeOfRoutes(){
		var user = JSON.parse(localStorage.getItem('user'));
		if (this.commonService.required(user)) {
			if (user.role == "USER" && this.route.url == '/admin') {
				this.route.navigateByUrl("/dashboard");
			}else if(user.role == "USER" && this.route.url == '/add-categories'){
				this.route.navigateByUrl("/dashboard");
			}else if(user.role == "USER" && this.route.url == '/add-movies'){
				this.route.navigateByUrl("/dashboard");
			}else if(user.role == "USER" && this.route.url == '/suggested-movies'){
				this.route.navigateByUrl("/dashboard");
			}else if(user.role == "USER" && this.route.url == '/view-grades'){
				this.route.navigateByUrl("/dashboard");
			}else if(user.role == "ADMIN" && this.route.url == '/dashboard'){
				this.route.navigateByUrl("/admin");
			}else if(user.role == "ADMIN" && this.route.url == '/movies'){
				this.route.navigateByUrl("/admin");
			}else if(user.role == "ADMIN" && this.route.url == '/favorites'){
				this.route.navigateByUrl("/admin");
			}else if(user.role == "ADMIN" && this.route.url == '/suggest-movie'){
				this.route.navigateByUrl("/admin");
			}
		}else this.route.navigateByUrl("/login");
	}
}
