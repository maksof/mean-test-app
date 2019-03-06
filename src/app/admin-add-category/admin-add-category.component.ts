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

	categoryName:any = {};
	timePeriod:any = {};

	categoryId:string = '';
	timePeriodId:string = '';
	mainToggle:boolean = true;

	ngOnInit() {
	}
	
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}
	addCategory(){
		if (this.commonService.required(this.categoryName.categoryName)) {
			this.sharedService.addNewCategory(this.categoryName).subscribe(res=> {
				if (res.status == "OK") {
					this.notificationsService.success('Success','New category created successfully.');
					this.categoryName = {};
				}
			}, (error)=>{
				this.notificationsService.error('Error','Internal server error.');
			});
		}else{
			this.notificationsService.error('Error','Please fill all the required fields.');
		}
	}
	
	addTimePeriod(){
		if (this.commonService.required(this.timePeriod.timePeriod)) {
			this.sharedService.addTimePeriod(this.timePeriod).subscribe(res=> {
				if (res.status == "OK") {
					this.notificationsService.success('Success','New Time Period created successfully.');
					this.timePeriod = {};
				}
			}, (error)=>{
				this.notificationsService.error('Error','Internal server error.');
			});
		}else{
			this.notificationsService.error('Error','Please fill all the required fields.');
		}
	}
	categoryDeleteModal(id){
		document.getElementById("accessCatDeleteModal").click();
		this.categoryId = id;
	}
	timeDeleteModal(id){
		this.timePeriodId = id;
		document.getElementById("accessTimeDeleteModal").click();
	}
	deleteCategory(){
		if (this.commonService.required(this.categoryId)) {
			this.sharedService.deleteCategory(this.categoryId).subscribe(res=>{
				if (res.status == "OK") {
					document.getElementById("closeDeleteCat").click();
					this.notificationsService.info("Success","Category deleted successfully.");
					this.categoryId = '';
				}
			},(error)=>{
				document.getElementById("closeDeleteCat").click();
				this.notificationsService.error("Error","Internal Server Error!");
			});
		}
	}
	deleteTimePeriod(){
		if (this.commonService.required(this.timePeriodId)) {
			this.sharedService.deleteTimePeriod(this.timePeriodId).subscribe(res=>{
				if (res.status == "OK") {
					document.getElementById("closeDeleteTime").click();
					this.notificationsService.info("Success","Time Period deleted successfully.");
					this.timePeriodId = '';
				}
			},(error)=>{
				document.getElementById("closeDeleteCat").click();
				this.notificationsService.error("Error","Internal Server Error!");
			});
		}
	}
}
