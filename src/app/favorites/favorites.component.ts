import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {SharedService} from '../shared.service';
import {CommonService} from '../common.service';
import {NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';

@Component({
	selector: 'app-favorites',
	templateUrl: './favorites.component.html',
	styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

	constructor(private snackBar: MatSnackBar, public sharedService:SharedService, public notificationService:NotificationsService, public commonService:CommonService) { }

	user = JSON.parse(localStorage.getItem('user'));
	showLoader:boolean = true;
	mainToggle:boolean = true;
	favoriteMovies:any = [];
	allCategories:any = [];
	
	ngOnInit() {
		this.getAllCategories();
	}
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}
	getAllFavoriteMovies(){
		this.showLoader = true;
		this.sharedService.getAllFavoriteMovies(this.user.id).subscribe(res=>{
			this.showLoader = false;
			var favMovies = res.data;
			var self = this;
			favMovies.forEach(function(m){
				m.favorite = true;
				self.allCategories.forEach(function(cat){
					if (cat.id == m.categoryId) m.category = cat;
				});
			});
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
			this.allCategories = res.data;
			this.getAllFavoriteMovies();
		},(error)=>{
			this.showLoader = false;
			this.notificationService.error("Error", "Internal Server Error.");
		});
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
