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
	ngOnInit() {
	}
	openDropDown(){
		this.dropState = !this.dropState;
	}
	toggleSideBar(){
		this.sideBarBool = !this.sideBarBool;
		this.headerClassChange.emit();
	}
}