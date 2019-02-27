import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-fees',
	templateUrl: './fees.component.html',
	styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

	constructor() { }

	mainToggle:boolean = true;

	ngOnInit() {
	}

	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}

}
