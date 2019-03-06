import { Component, OnInit } from '@angular/core';
import { CommonService } from './../common.service';
import { SharedService } from './../shared.service';
import { NotificationsService } from 'angular2-notifications';
import { HttpModule, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-admin-add-movies',
	templateUrl: './admin-add-movies.component.html',
	styleUrls: ['./admin-add-movies.component.css']
})
export class AdminAddMoviesComponent implements OnInit {

	constructor(public commonService:CommonService, private notificationsService:NotificationsService, private sharedService:SharedService, public http: HttpClient) { }
	moviesObj:any = {};
	allCategories:any = [];
	image:File = null;
	imagePreview:any = '';
	labImg:any;
	mainToggle:boolean = true;
	showLoader:boolean = false;
	ngOnInit() {
		this.getAllCategory()
	}
	
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
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
	addMovies(){
		if (this.commonService.required(this.moviesObj.title) && this.commonService.required(this.moviesObj.year) && this.commonService.required(this.moviesObj.director) && this.commonService.required(this.moviesObj.categoryId) && this.commonService.required(this.moviesObj.description)) {
			if (this.checkMovieYear(this.moviesObj.year)) {
				console.log(this.moviesObj);
			}else{
				this.notificationsService.error('Error',"Please enter a valid year.");
			}
			// this.sharedService.addNewCategory(this.moviesObj).subscribe(res=> {
				// 	console.log(res);
				// 	this.notificationsService.success('Success','New category created successfully.');
				// }, (error)=>{
					// 	this.notificationsService.error('Error','Internal server error.');
					// });
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
	saveImage(event){
		this.image = event.target.files[0];
		console.log(this.image);
		const reader = new FileReader();
		reader.onload = () => {
			this.imagePreview = reader.result;
		};
		console.log(this.imagePreview);
		reader.readAsDataURL(this.image);
		this.http.post('assets/movies-poster', this.image).subscribe(
			data => {
				alert(data)
			});
	}
}
