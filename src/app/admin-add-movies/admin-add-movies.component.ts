import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-admin-add-movies',
	templateUrl: './admin-add-movies.component.html',
	styleUrls: ['./admin-add-movies.component.css']
})
export class AdminAddMoviesComponent implements OnInit {

	constructor() { }

	mainToggle:boolean = true;

	ngOnInit() {
	}
	
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}
}
