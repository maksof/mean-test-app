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
		var adminRoutes = ['/admin', '/add-categories', '/add-movies', '/suggested-movies', '/view-grades'];
		var userRoutes = ['/dashboard', '/suggest-movie', '/favorites', '/movies', '/profile'];
		var isAdmin = adminRoutes.indexOf(this.route.url);
		var isUser = userRoutes.indexOf(this.route.url);
		console.log(isUser,isAdmin);
		if (this.commonService.required(user)) {
			if(isAdmin != -1 && user.role == "ADMIN") {
				console.log(isAdmin,"ADMIN");
				this.route.navigateByUrl(this.route.url);
			} else if(isUser != -1 && user.role == "USER") {
				console.log(isUser,"USER");
				this.route.navigateByUrl(this.route.url);
			} else if(isAdmin != -1 && user.role == "USER") {
				console.log(isAdmin,"admin");
				this.route.navigateByUrl('/dashboard');
			} else if(isUser != -1 && user.role == "ADMIN") {
				console.log(isUser,"user");
				this.route.navigateByUrl('/admin');
			}else{
				console.log("F");
			}
		}
	}
}
