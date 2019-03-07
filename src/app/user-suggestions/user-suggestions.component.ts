import { Component, OnInit } from '@angular/core';
import { CommonService } from './../common.service';
import { SharedService } from './../shared.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
	selector: 'app-user-suggestions',
	templateUrl: './user-suggestions.component.html',
	styleUrls: ['./user-suggestions.component.css']
})
export class UserSuggestionsComponent implements OnInit {

	constructor(public commonService:CommonService, private notificationsService:NotificationsService, private sharedService:SharedService) { }
	allCategories:any = [];
	allSuggestedMovies:any = [];
	showLoader = true;
	mainToggle:boolean = true;
	movieAcceptId = '';
	movieRejectId = '';

	ngOnInit() {
		this.getAllCategory();
		this.getAllSuggestedMovies();
	}
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}
	getAllSuggestedMovies(){
		this.showLoader = true;
		this.sharedService.getSuggestedMovies().subscribe(res=>{
			var self = this;
			var movies = res.data;
			movies.forEach(function(row){
				self.allCategories.forEach(function(cat){
					if (row.categoryId == cat.id) {
						row.category = cat;
					}
				});
			});
			this.allSuggestedMovies = movies;
			this.showLoader = false;
		},(error)=>{
			this.showLoader = false;
			this.notificationsService.error("Error!","Internal Server Error.");
		});
	}
	getAllCategory(){
		this.showLoader = true;
		this.sharedService.getAllCategories().subscribe(res =>{
			this.showLoader = false;
			this.allCategories = res.data;
		},(error)=>{
			this.showLoader = false;
			this.notificationsService.error("Error!","Internal Server Error.");
		})
	}
	AcceptMovieModal(id){
		this.movieAcceptId = id;
		document.getElementById("accessAccMovieModal").click();
	}
	RejectMovieModal(id){
		this.movieRejectId = id;
		document.getElementById("accessRejMovieModal").click();
	}
	acceptMovie(){
		console.log("WTH");
		if (this.commonService.required(this.movieAcceptId)) {
			this.showLoader = true;
			this.sharedService.acceptSuggestedMovies(this.movieAcceptId).subscribe(res=>{
				if (res.status == "OK") {
					this.showLoader = false;
					this.notificationsService.info("Success","Movie Accepted.");
					document.getElementById("closeaccMovie").click();
					this.getAllSuggestedMovies();
				}
			},(error)=>{
				this.showLoader = false;
				this.notificationsService.error("Error!","Internal Server Error.")
			});
		}
	}
	rejectMovie(){
		console.log("WTG");
		if (this.commonService.required(this.movieRejectId)) {
			this.showLoader = true;
			this.sharedService.rejectSuggestedMovies(this.movieRejectId).subscribe(res=>{
				this.showLoader = false;
				if (res.status == "OK") {
					this.getAllSuggestedMovies();
					document.getElementById("closeDeclineMovie").click();
					this.notificationsService.info("Success","Movie Rejected.");
				}
			},(error)=>{
				this.showLoader = false;
				this.notificationsService.error("Error!","Internal Server Error.")
			});
		}
	}
}
