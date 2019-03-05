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
	moviesObj:any = {};
	mainToggle:boolean = true;
	labImg:any;

	ngOnInit() {
	}
	
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}
	addMovies(){
		console.log(this.moviesObj);
		if (this.commonService.required(this.moviesObj.title)) {
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
	saveImage(event){
		console.log(this.labImg);
		console.log(event);
	}
}
