import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-view-grades',
	templateUrl: './view-grades.component.html',
	styleUrls: ['./view-grades.component.css']
})
export class ViewGradesComponent implements OnInit {

	constructor() { }

	mainToggle:boolean = true;

	ngOnInit() {
	}
	
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}
}
