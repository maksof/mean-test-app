import { Component, OnInit } from '@angular/core';
import { CommonService } from './../common.service';
import { SharedService } from './../shared.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
	selector: 'app-admin-add-movies',
	templateUrl: './admin-add-movies.component.html',
	styleUrls: ['./admin-add-movies.component.css']
})
export class AdminAddMoviesComponent implements OnInit {

	constructor(public commonService:CommonService, private notificationsService:NotificationsService, private sharedService:SharedService) { }
	user = JSON.parse(localStorage.getItem('user'));
	allCategories:any = [];
	allMovies:any = [];
	moviesObj:any = {};
	updateMovieData:any = {};
	deleteMovieId = '';
	hardDelete = false;

	mainToggle:boolean = true;
	showLoader:boolean = false;

	ngOnInit() {
		this.getAllCategory();
	}
	
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}
	getAllCategory(){
		this.showLoader = true;
		this.sharedService.getAllCategories().subscribe(res =>{
			this.showLoader = false;
			this.getAllMovies();
			this.allCategories = res.data;
		},(error)=>{
			this.showLoader = false;
			this.notificationsService.error("Error!","Internal Server Error.");
		})
	}
	addMovies(){
		if (this.commonService.required(this.moviesObj.title) && this.commonService.required(this.moviesObj.year) && this.commonService.required(this.moviesObj.director) && this.commonService.required(this.moviesObj.categoryId) && this.commonService.required(this.moviesObj.description) && this.commonService.required(this.moviesObj.distribution) && this.commonService.required(this.moviesObj.photoUrl)) {
			if (this.checkMovieYear(this.moviesObj.year)) {
				this.sharedService.addMovies(this.moviesObj).subscribe(res=> {
					this.showLoader = false;
					if (res.status == "OK") {
						this.getAllMovies();
						this.moviesObj = {};
						this.notificationsService.success('Success','Movie successfully added.');
					}
				}, (error)=>{
					this.notificationsService.error('Error','Internal server error.');
				});
			}else{
				this.notificationsService.error('Error',"Please enter a valid year.");
			}
			}else{
				this.notificationsService.error('Error','Please fill all the required fields.');
		}
	}
	checkMovieYear(year){
		var crntyear = this.commonService.getCurrentYear();
		if (year <= crntyear && year >= "1901") {
			return true;
		}else{
			return false;
		}
	}
	
	getAllMovies(){
		this.showLoader = true;
		this.sharedService.getAllMovies(this.user.id).subscribe(res=>{
			var self = this;
			var movies = res.data;
			movies.forEach(function(row){
				self.allCategories.forEach(function(cat){
					if (row.categoryId == cat.id) {
						row.category = cat;
					}
				});
			});
			this.allMovies = movies;
			this.showLoader = false;
		},(error)=>{
			this.showLoader = false;
			this.notificationsService.error("Error!","Internal Server Error.");
		});
	}
	deleteMovieModal(id){
		this.deleteMovieId = id;
		document.getElementById("accessModalDeleteModal").click();
	}
	updateMovieModal(id){
		var self = this;
		this.allMovies.forEach(function(row){
			if (row.id == id) {
				self.updateMovieData = row;
			}
		});
		document.getElementById("accessMovieUpdateModal").click();
	}
	deleteMovie(){
		var deleteDetails : any = {};
		this.showLoader = true;
		if (this.commonService.required(this.deleteMovieId)) {
			deleteDetails.hardDelete = this.hardDelete;
			deleteDetails.id = this.deleteMovieId;
			this.sharedService.deleteMovie(deleteDetails).subscribe(res=>{
				document.getElementById("closeDeleteMovie").click();
				this.showLoader = false;
				if (res.status == "OK") {
					this.getAllMovies();
					this.hardDelete =false;
					this.notificationsService.info("Success","Movie Successfully Deleted.");
				}
			},(error)=>{
				document.getElementById("closeDeleteMovie").click();
				this.showLoader = false;
				this.notificationsService.error("Error!","Internal Service Error.");
			})
		}
	}
	updateMovie(){
		if (this.commonService.required(this.updateMovieData.title) && this.commonService.required(this.updateMovieData.year) && this.commonService.required(this.updateMovieData.director) && this.commonService.required(this.updateMovieData.categoryId) && this.commonService.required(this.updateMovieData.description) && this.commonService.required(this.updateMovieData.photoUrl) && this.commonService.required(this.updateMovieData.distribution)) {
			if (this.checkMovieYear(this.updateMovieData.year)) {
				this.showLoader = true;
				this.sharedService.updateMovie(this.updateMovieData).subscribe(res=> {
					this.showLoader = false;
					if (res.status == "OK") {
						this.getAllMovies();
						document.getElementById("closeUpdateMovie").click();
						this.notificationsService.success('Success','Movie updated successfully.');
					}
				}, (error)=>{
					this.notificationsService.error('Error','Internal server error.');
				});
			}else{
				this.notificationsService.error('Error',"Please enter a valid year.");
			}
			}else{
				this.notificationsService.error('Error','Please fill all the required fields.');
		}
	}
}
