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
	allCategories:any = [];
	allTimePeriod:any = [];
	categoryId:string = '';
	timePeriodId:string = '';
	mainToggle:boolean = true;
	showLoader:boolean = false;

	ngOnInit() {
		this.getAllCategory();
		this.getAllTimePeriod();
	}
	
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}
	getAllCategory(){
		this.showLoader = true;
		this.sharedService.getAllCategories().subscribe(res =>{
			this.showLoader = false;
			this.allCategories = res.data;
			this.allCategories.sort(this.sortArr);
		},(error)=>{
			this.showLoader = false;
			this.notificationsService.error("Error!","Internal Server Error.");
		})
	}
	getAllTimePeriod(){
		this.showLoader = true;
		this.sharedService.getAllTimePeriod().subscribe(res =>{
			this.showLoader = false;
			this.allTimePeriod = res.data;
		},(error)=>{
			this.showLoader = false;
			this.notificationsService.error("Error!","Internal Server Error.");
		})
	}
	addCategory(){
		if (this.commonService.required(this.categoryName.categoryName)) {
			this.showLoader = true;
			this.sharedService.addNewCategory(this.categoryName).subscribe(res=> {
				this.showLoader = false;
				if (res.status == "OK") {
					this.getAllCategory();
					this.notificationsService.success('Success','New category created successfully.');
					this.categoryName = {};
				}
			}, (error)=>{
				this.showLoader = false;
				this.notificationsService.error('Error','Internal server error.');
			});
		}else{
			this.notificationsService.error('Error','Please fill all the required fields.');
		}
	}
	
	addTimePeriod(){
		if (this.commonService.required(this.timePeriod.timePeriod)) {
			this.showLoader = true;
			this.sharedService.addTimePeriod(this.timePeriod).subscribe(res=> {
				this.showLoader = false;
				if (res.status == "OK") {
					this.getAllTimePeriod();
					this.notificationsService.success('Success','New Time Period created successfully.');
					this.timePeriod = {};
				}
			}, (error)=>{
				this.showLoader = false;
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
			this.showLoader = true;
			this.sharedService.deleteCategory(this.categoryId).subscribe(res=>{
				this.showLoader = false;
				if (res.status == "OK") {
					this.getAllCategory();
					document.getElementById("closeDeleteCat").click();
					this.notificationsService.info("Success","Category deleted successfully.");
					this.categoryId = '';
				}
			},(error)=>{
				this.showLoader = false;
				document.getElementById("closeDeleteCat").click();
				this.notificationsService.error("Error","Internal Server Error!");
			});
		}
	}
	deleteTimePeriod(){
		if (this.commonService.required(this.timePeriodId)) {
			this.showLoader = true;
			this.sharedService.deleteTimePeriod(this.timePeriodId).subscribe(res=>{
				this.showLoader = false;
				if (res.status == "OK") {
					this.getAllTimePeriod();
					document.getElementById("closeDeleteTime").click();
					this.notificationsService.info("Success","Time Period deleted successfully.");
					this.timePeriodId = '';
				}
			},(error)=>{
				this.showLoader = false;
				document.getElementById("closeDeleteCat").click();
				this.notificationsService.error("Error","Internal Server Error!");
			});
		}
	}

	sortArr(a, b) {
    var textA = a.categoryName.toUpperCase();
    var textB = b.categoryName.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }
}
