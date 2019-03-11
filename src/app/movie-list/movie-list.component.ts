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

	constructor(private snackBar: MatSnackBar, public sharedService:SharedService, public notificationService:NotificationsService, public commonService:CommonService) { }

	star: boolean[] = [false,false,false,false,false,false,false,true,true,true];
	starRating: number;
	mainToggle:boolean = true;
	showLoader:boolean = true;
	movieListObj:any = {
		categoryId:'',
		title:''
	};
	movies:any  = [];
	allCategories:any = [];

	ngOnInit() {
		this.getAllCategories();
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
	getAllCategories(){
		this.showLoader = true;
		this.sharedService.getAllCategories().subscribe(res=>{
			this.showLoader = false;
			this.allCategories = res.data;
		},(error)=>{
			this.showLoader = false;
			this.notificationService.error("Error", "Internal Server Error.");
		})
	}
	getMovies(){
		this.showLoader = true;
		this.sharedService.getAllMovies().subscribe(res=>{
			var self = this;
			var allMovies = res.data;
			allMovies.forEach(function(m){
				self.allCategories.forEach(function(cat){
					if (m.categoryId == cat.id) {
						m.category = cat;
					}
				});
			});
			this.movies = allMovies;
			this.showLoader = false;
		}, (error)=>{
			this.showLoader = false;
			this.notificationService.error("Error", "Internal Server Error.");
		})
	}
	searchMovies(){
		if (this.commonService.required(this.movieListObj.categoryId) || this.commonService.required(this.movieListObj.title)) {
			this.showLoader = true;
			this.sharedService.searchMovies(this.movieListObj.categoryId, this.movieListObj.title).subscribe(res=>{
				if (this.commonService.required(res.data)) {
					this.movies = [];
					var self = this;
					var allMovies = res.data;
					allMovies.forEach(function(m){
						self.allCategories.forEach(function(cat){
							if (m.categoryId == cat.id) {
								m.category = cat;
							}
						});
					});
					this.movies = allMovies;
				}else this.notificationService.info("Info", "No records found.");
				this.showLoader = false;
			},(error)=>{
				this.showLoader = false;
				this.notificationService.error("Error", "Internal Server Error.");
			})
		}else this.notificationService.error('Error','Please fill all the required (*) fields.');
	}
}
