import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-user-suggestions',
	templateUrl: './user-suggestions.component.html',
	styleUrls: ['./user-suggestions.component.css']
})
export class UserSuggestionsComponent implements OnInit {

	constructor() { }
	mainToggle:boolean = true;

	ngOnInit() {
	}
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}
}
