import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {CommonService} from '../common.service';
import {NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';

@Component({
	selector: 'app-suggest-movie',
	templateUrl: './suggest-movie.component.html',
	styleUrls: ['./suggest-movie.component.css']
})
export class SuggestMovieComponent implements OnInit {

	constructor(public sharedService:SharedService, public notificationService:NotificationsService, public commonService:CommonService) { }

	suggestMovieObj:any = {};
	mainToggle:boolean = true;
	showLoader:boolean = true;
	allCategories:any = [];

	ngOnInit() {
		this.getAllCategories();
	}
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}

	getAllCategories(){
		this.showLoader = true;
		this.sharedService.getAllCategories().subscribe(res=>{
			this.showLoader = false;
			this.allCategories = res.data;
		},(error)=>{
			this.showLoader = false;
			this.notificationService.error("Error", "Internal Server Error.");
		});
	}
	suggestMovies(){
		if (this.commonService.required(this.suggestMovieObj.title) && this.commonService.required(this.suggestMovieObj.year) && this.commonService.required(this.suggestMovieObj.director) && this.commonService.required(this.suggestMovieObj.categoryId) && this.commonService.required(this.suggestMovieObj.description) && this.commonService.required(this.suggestMovieObj.distribution) && this.commonService.required(this.suggestMovieObj.photoUrl)) {
			if (this.checkMovieYear(this.suggestMovieObj.year)) {
				this.sharedService.suggestMovie(this.suggestMovieObj).subscribe(res=> {
					this.showLoader = false;
					if (res.status == "OK") {
						this.suggestMovieObj = {};
						this.notificationService.success('Success','Movie successfully suggested.');
					}
				}, (error)=>{
					this.notificationService.error('Error','Internal server error.');
				});
			}else this.notificationService.error('Error',"Please enter a valid year.");
		}else this.notificationService.error('Error','Please fill all the required fields.');
	}
	checkMovieYear(year){
		var crntyear = this.commonService.getCurrentYear();
		if (year <= crntyear && year >= "1901") {
			return true;
		}else{
			return false;
		}
	}
}
