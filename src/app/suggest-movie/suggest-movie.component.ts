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
	suggestMovieObj:any = {};

	constructor(public sharedService:SharedService, public notificationService:NotificationsService, public commonService:CommonService) { }
	mainToggle:boolean = true;
	allCategories:any = [];
	ngOnInit() {
	}
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}

	getAllCategories(){

		this.sharedService.getAllCategories().subscribe(res=>{
			this.allCategories = res.data;
		},(error)=>{
			this.notificationService.error("Error", "Internal Server Error.");
		})
	}
}
