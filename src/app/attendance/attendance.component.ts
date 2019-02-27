import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-attendance',
	templateUrl: './attendance.component.html',
	styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

	constructor() { }

	mainToggle:boolean = true;

	ngOnInit() {
	}

	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}

}