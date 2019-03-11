import { Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(public router: Router) { }
	@Output() headerClassChange = new EventEmitter();
	admin:boolean = false;
	dropState:boolean = false;
	sideBarBool:boolean = true;
	user = JSON.parse(localStorage.getItem('user'));

	ngOnInit() {
		this.checkUser();
	}
	openDropDown(){
		this.dropState = !this.dropState;
	}
	toggleSideBar(){
		this.sideBarBool = !this.sideBarBool;
		this.headerClassChange.emit();
	}
	checkUser(){
		if (this.user.role == "USER") {
			this.admin = false;
		}else if(this.user.role == "ADMIN"){
			this.admin = true;
		}else{
			this.router.navigateByUrl("login");
		}
	}
	logout(){
		localStorage.removeItem("user");
		this.router.navigateByUrl("login");
	}
}