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
	private totalItems: any[];
	pager: any = {};
	pagedItems: any[];
	start = true;

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
			this.allGrades = res.data.data;
			this.totalItems = res.data.total;
			if (this.start == true)this.setPage(1);
		},(error)=>{
			this.showLoader = false;
			this.notificationsService.error('Error','Internal Server Error, please try again later.');
		})
	}
	setPage(page: number) {
		this.start = false;
        this.pager = this.commonService.getPager(this.totalItems, page, this.limit);
		if(page > this.pager.endPage) page = this.pager.endPage;
		if(page < 1) page = 1;
        this.offset = (page - 1) * this.limit;
        this.getAllMovieGrades();
    }
 
}
