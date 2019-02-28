import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-suggest-movie',
	templateUrl: './suggest-movie.component.html',
	styleUrls: ['./suggest-movie.component.css']
})
export class SuggestMovieComponent implements OnInit {

	constructor() { }
	mainToggle:boolean = true;
	ngOnInit() {
	}
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}

}
