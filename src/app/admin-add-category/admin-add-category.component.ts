import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-admin-add-category',
	templateUrl: './admin-add-category.component.html',
	styleUrls: ['./admin-add-category.component.css']
})
export class AdminAddCategoryComponent implements OnInit {

	constructor() { }

	mainToggle:boolean = true;

	ngOnInit() {
	}
	
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}
}
