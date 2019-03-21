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
	backupAllRows:any = [];
	offset = 0;
	limit = 10;
	private totalItems: any = [];
	pager: any = {};
	titleSearch;
	nameSearch;
	pagedItems: any = [];
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
			if (res.status == "OK") {
				if (this.commonService.requiredArray(res.data.data)) {
					this.allGrades = this.setDataForGrid(res.data.data);
					this.backupAllRows = this.allGrades;
					this.totalItems = res.data.total;
					if (this.start == true)this.setPage(1);
				}
			}else{
				this.notificationsService.info("Info", res.message);
			}
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
	nSearch(search, type){
		var data = this.dropdownFilter(search, type);
		if(data != undefined) this.allGrades = data;
		else this.allGrades = []; 
		return ;
	}

	dropdownFilter(searchKeyword,type) {
		if(type == 'title'){
			var searchParam = ['title'];
			return this.filterData(searchKeyword,searchParam);
		}
		else if(type == 'name'){
			var searchParam = ['first_name', 'last_name'];
			return this.filterData(searchKeyword, searchParam);
		}
	}
	filterData(searchKeyword,searchParam){
		var type = parseInt(searchKeyword);
		for(var i=0; i < searchParam.length; i++){
			var data = this.backupAllRows.filter(function(el) {
				if (isNaN(type) && isNaN(el[searchParam[i]])) {
					return ((el[searchParam[i]] != undefined && (el[searchParam[i]].toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1))); 
				}else{
					return ((el[searchParam[i]] != undefined && (el[searchParam[i]].toString().indexOf(searchKeyword) > -1))); 
				}
			});
			if(data.length > 0){return data;}
		}
	}

	setDataForGrid(data){
		data.forEach(function(item){
		if(item.tbl_movie.title) item.title = item.tbl_movie.title;
		if(item.tbl_user.first_name) item.first_name = item.tbl_user.first_name;
		if(item.tbl_user.last_name) item.last_name = item.tbl_user.last_name;
		});
		return data;
	}
}
