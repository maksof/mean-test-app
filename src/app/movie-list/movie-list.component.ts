import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {SharedService} from '../shared.service';
import {CommonService} from '../common.service';
import {NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';


@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
	movieListObj:any = {};

	constructor(private snackBar: MatSnackBar, public sharedService:SharedService, public notificationService:NotificationsService, public commonService:CommonService) { }
	star: boolean[] = [false,false,false,false,false,false,false,true,true,true];
	starRating: number;
	mainToggle:boolean = true;
	movies:any  = [];
	
	ngOnInit() {
		this.getMovies();
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
	getMovies(){
		this.sharedService.getMovies().subscribe(res=>{
			this.movies = res.data;
		}, (error)=>{
			this.notificationService.error("Error", "Internal Server Error.");
		})
	}

}
