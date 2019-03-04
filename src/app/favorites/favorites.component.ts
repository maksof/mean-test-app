import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Component({
	selector: 'app-favorites',
	templateUrl: './favorites.component.html',
	styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

	constructor(private snackBar: MatSnackBar) { }
	star: boolean[] = [false,false,false,false,false,false,false,true,true,true];
	starRating: number;
	mainToggle:boolean = true;
	
	ngOnInit() {
	}
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}
	setStartList(data:any){
		this.starRating = data+1;
		for(var i=0;i<=9;i++){
			if(i<=data){
				this.star[i]=false;
			}
			else{
				this.star[i]=true;
			}
		}
		this.snackBar.open('Thanks For Rating Us.', '', {
			duration: 2000,
		});
	}
}
