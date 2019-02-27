import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-excersice',
	templateUrl: './excersice.component.html',
	styleUrls: ['./excersice.component.css']
})
export class ExcersiceComponent implements OnInit {

	constructor() { }

	mainToggle:boolean = true;

	ngOnInit() {
	}

	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}

}
