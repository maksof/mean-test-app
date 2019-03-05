import { Component, OnInit } from '@angular/core';
import { CommonService } from './../common.service';
import { SharedService } from './../shared.service';
import { NotificationsService } from 'angular2-notifications';
@Component({
	selector: 'app-admin-add-category',
	templateUrl: './admin-add-category.component.html',
	styleUrls: ['./admin-add-category.component.css']
})
export class AdminAddCategoryComponent implements OnInit {

	constructor(public commonService:CommonService, private notificationsService:NotificationsService, private sharedService:SharedService) { }

	categoryName:string = '';
	timePeriod:string = '';

	mainToggle:boolean = true;

	ngOnInit() {
	}
	
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}
	addCategory(){
		if (this.commonService.required(this.categoryName)) {
			this.sharedService.addNewCategory(this.categoryName).subscribe(res=> {
				console.log(res);
				this.notificationsService.success('Success','New category created successfully.');
			}, (error)=>{
				this.notificationsService.error('Error','Internal server error.');
			});
		}else{
			this.notificationsService.error('Error','Please fill all the required fields.');
		}
	}
	
	addTimePeriod(){
		if (this.commonService.required(this.timePeriod)) {
			this.sharedService.addTimePeriod(this.timePeriod).subscribe(res=> {
				console.log(res);
				this.notificationsService.success('Success','New Time Period created successfully.');
			}, (error)=>{
				this.notificationsService.error('Error','Internal server error.');
			});
		}else{
			this.notificationsService.error('Error','Please fill all the required fields.');
		}
	}
}
