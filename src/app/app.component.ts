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
	user = JSON.parse(localStorage.getItem('user'));
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
		if (this.commonService.required(this.user)) {
			if(!this.commonService.required(this.user.role)){
				this.route.navigateByUrl("login");
				localStorage.removeItem("user");
			}
		}else{
			this.route.navigateByUrl("login");
			localStorage.removeItem("user");
		}
	}
	changeOfRoutes(){
		console.log("CHECK");
		if (this.user.role == "USER" && this.route.url == '/admin') {
			this.route.navigateByUrl("/dashboard");
		}else if(this.user.role == "USER" && this.route.url == '/add-categories'){
			this.route.navigateByUrl("/dashboard");
		}else if(this.user.role == "USER" && this.route.url == '/add-movies'){
			this.route.navigateByUrl("/dashboard");
		}else if(this.user.role == "USER" && this.route.url == '/suggested-movies'){
			this.route.navigateByUrl("/dashboard");
		}else if(this.user.role == "USER" && this.route.url == '/view-grades'){
			this.route.navigateByUrl("/dashboard");
		}else if(this.user.role == "ADMIN" && this.route.url == '/dashboard'){
			this.route.navigateByUrl("/admin");
		}else if(this.user.role == "ADMIN" && this.route.url == '/movies'){
			this.route.navigateByUrl("/admin");
		}else if(this.user.role == "ADMIN" && this.route.url == '/favorites'){
			this.route.navigateByUrl("/admin");
		}else if(this.user.role == "ADMIN" && this.route.url == '/suggest-movie'){
			this.route.navigateByUrl("/admin");
		}
	}
}
