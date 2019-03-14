import { Component, OnInit } from '@angular/core';
import { CommonService } from './../common.service';
import { SharedService } from './../shared.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
	selector: 'app-view-grades',
	templateUrl: './view-grades.component.html',
	styleUrls: ['./view-grades.component.css']
})
export class ViewGradesComponent implements OnInit {

	constructor(public commonService:CommonService, private notificationsService:NotificationsService, private sharedService:SharedService) { }

	mainToggle:boolean = true;
	showLoader:boolean = false;
	allGrades:any = [];
	offset = 0;
	limit = 10;
	ngOnInit() {
		this.getAllMovieGrades();
	}
	
	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}
	getAllMovieGrades(){
		this.showLoader = true;
		this.sharedService.viewGrade(this.limit, this.offset).subscribe(res=>{
			this.showLoader = false;
			if (res.status == "OK") {
				if (this.commonService.requiredArray(res.data)) {
					this.allGrades = res.data;
				}
			}else{
				this.notificationsService.info("Info", res.message);
			}			
		},(error)=>{
			this.showLoader = false;
			this.notificationsService.error('Error','Internal Server Error, please try again later.');
		})
	}
}
