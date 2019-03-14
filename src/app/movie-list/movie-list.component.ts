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
	user = JSON.parse(localStorage.getItem('user'));
	star: boolean[] = [false,false,false,false,false,false,false,true,true,true];
	starRating: number;
	mainToggle:boolean = true;
	filtered:boolean = false;
	showLoader:boolean = true;
	movieListObj:any = {
		categoryId:'',
		title:''
	};
	movies:any  = [];
	allCategories:any = [];
	favoriteMovies:any = [];

	ngOnInit() {
		this.getAllFavoriteMovies();
	}
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}
	setStartList(data:any,movieId:any){
		this.starRating = data+1;
		var rate = data+1;
		var obj:any = {};
		obj.userId = this.user.id;
		obj.movieId = movieId;
		obj.grade = rate;
		this.sharedService.rateMovie(obj).subscribe(res=>{
			if (res.status == "OK") {
				this.snackBar.open('Thanks For Rating.', '', {
					duration: 2000,
				});
			}
		},(error)=>{
			this.snackBar.open('Internal Server Error', '', {
				duration: 2000,
			});
		})
		for(var i=0;i<=9;i++){
			if(i<=data){
				this.star[i]=false;
			}
			else{
				this.star[i]=true;
			}
		}
	}
	getAllFavoriteMovies(){
		this.showLoader = true;
		this.sharedService.getAllFavoriteMovies(this.user.id).subscribe(res=>{
			this.showLoader = false;
			this.getAllCategories();
			this.favoriteMovies = res.data;
		},(error)=>{
			this.showLoader = false;
			this.notificationService.error("Error", "Internal Server Error.");
		});
	}
	getAllCategories(){
		this.showLoader = true;
		this.sharedService.getAllCategories().subscribe(res=>{
			this.showLoader = false;
			this.getMovies();
			this.allCategories = res.data;
		},(error)=>{
			this.showLoader = false;
			this.notificationService.error("Error", "Internal Server Error.");
		});
	}
	getMovies(){
		this.showLoader = true;
		this.sharedService.getAllMovies(this.user.id).subscribe(res=>{
			var self = this;
			var allMovies = res.data;
			allMovies.forEach(function(m){
				self.allCategories.forEach(function(cat){
					if (cat.id == m.tbl_movie.categoryId) m.category = cat;
				});
			});
			if (this.commonService.requiredArray(self.favoriteMovies)) {
				self.favoriteMovies.forEach(function(fMovie){
					allMovies.forEach(function(m){
						if (fMovie.id == m.tbl_movie.id) m.favorite = true;
					});
				});
			}
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
			this.sharedService.searchMovies(this.movieListObj.categoryId, this.movieListObj.title, this.user.id).subscribe(res=>{
				this.filtered = true;
				if (this.commonService.required(res.data)) {
					this.movies = [];
					var self = this;
					var allMovies = res.data;
					allMovies.forEach(function(m){
						self.allCategories.forEach(function(cat){
							if (m.tbl_movie.categoryId == cat.id) {
								m.category = cat;
							}
						});
					});
					if (this.commonService.requiredArray(self.favoriteMovies)) {
						self.favoriteMovies.forEach(function(fMovie){
							allMovies.forEach(function(m){
								if (fMovie.id == m.tbl_movie.id) m.favorite = true;
							});
						});
					}
					this.movies = allMovies;
				}else this.notificationService.info("Info", "No records found.");
				this.showLoader = false;
			},(error)=>{
				this.showLoader = false;
				this.notificationService.error("Error", "Internal Server Error.");
			})
		}else this.notificationService.error('Error','Please fill all the required (*) fields.');
	}
	clearFilter(){
		this.filtered = false;
		this.movieListObj.categoryId = '';
		this.movieListObj.title = '';
		this.getMovies();
	}
	removeFromFavorite(id){
		var obj = {
			userId:this.user.id,
			movieId:id
		}
		this.showLoader = true;
		this.sharedService.removeFavoriteMovie(obj).subscribe(res=>{
			this.showLoader = false;
			this.getAllFavoriteMovies();
			this.notificationService.info("Info","Movie removed from favorite.");
		},(error)=>{
			this.showLoader = false;
			this.notificationService.error("Error", "Internal Server Error.");
		});
	}
	addToFavorite(id){
		var obj = {
			userId:this.user.id,
			movieId:id
		}
		this.showLoader = true;
		this.sharedService.addToFavourite(obj).subscribe(res=>{
			this.showLoader = false;
			this.getAllFavoriteMovies();
			this.notificationService.success("Success","Movie added to favorite.");
		},(error)=>{
			this.showLoader = false;
			this.notificationService.error("Error", "Internal Server Error.");
		});
	}
}
