import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { CommonService } from '../common.service';
import {NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
@Component({
	selector: 'app-user-dash',
	templateUrl: './user-dash.component.html',
	styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit {
	constructor(public sharedService:SharedService, public commonService:CommonService, public notificationService:NotificationsService) { }
	// bar chart Varibales
	public barChartOptions:any = {
		scaleShowVerticalLines: false,
		responsive: true,
		legend: false,
		scales: {
			xAxes: [{
				gridLines: {
					color: "rgba(0, 0, 0, 0)",
				}
			}],
			yAxes: [{
				gridLines: {
					color: "rgba(210, 210, 210, 0.75)",
				},ticks: {
					beginAtZero: true
				}
			}]
		},
	};
	public barChartLabels:Array<any> = [];
	public barChartType:string = 'bar';
	public barChartLegend:boolean = true;
	public barChartData:Array<any> = [{data:[0],label:""}];
	mainToggle:boolean = true;
	showLoader:boolean = false;
	timePeriod:any = [];
	timeId = '';
	ngOnInit() {
		this.getAllTimePeriod();
	}

	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}

	getAllTimePeriod(){
		this.showLoader = true;
		this.sharedService.getAllTimePeriod().subscribe(res=>{
			this.showLoader = false;
			this.timePeriod = res.data;
			this.timeId = this.timePeriod[0].id;
			this.getTimePeriodDashBoarData();
		},(error)=>{
			this.showLoader = false;
			this.notificationService.error("Error!","Internal Server Error.");
		})
	}
	
	getTimePeriodDashBoarData(){
		this.showLoader = true;
		this.sharedService.getMoviesOnTimePeriod(this.timeId).subscribe(res=>{
			if (this.commonService.requiredArray(res.movies)) {
				this.setBarChartData(res.movies);
			}
			this.showLoader = false;
		},(error)=>{
			this.showLoader = false;
		});
	}
	setBarChartData(arr){
		var self = this;
		var period = '';
		var chartData:Array<any> = [];
		this.timePeriod.forEach(function (row){
			if (row.id == self.timeId) period = row.timePeriod;
		});
		var pArr = period.split("-");
		var pIntArr = [];
		pArr.forEach(function(pRow){pIntArr.push(parseInt(pRow))});
		this.barChartLabels.push(pIntArr[0]);
		do {
			var mArr = this.barChartLabels[this.barChartLabels.length-1]+1;
			this.barChartLabels.push(mArr);
		}
		while (this.barChartLabels[this.barChartLabels.length-1] != pIntArr[1]);
		arr.sort(this.sortArr);
		var mDataArr = [];
		arr.forEach(function(mRow){
			var  obj = {avg:mRow.avg,year:mRow.year};
			mDataArr.push(obj);
		});
		var useYears = [];
		var addAvg = [];
		var count = 0;
		mDataArr.forEach(function(row){
			if(useYears.indexOf(row.year) == -1){
				if (addAvg.length != 0) {
					addAvg[addAvg.length-1] = addAvg[addAvg.length-1] / count;
					console.log(count);
					console.log(addAvg[addAvg.length-1]);
				}
				addAvg.push(row.avg);
				count = 1;
				useYears.push(row.year);
			}else{
				count += 1;
				console.log(row.avg);
				console.log(addAvg[addAvg.length-1]);
				addAvg[addAvg.length-1] += parseInt(row.avg);
			}
		});
		console.log(useYears);
		console.log(addAvg);
		console.log(count);
	}
	sortArr(a, b) {
		return a.year === null? 1 : b.year === null? -1 : a.year > b.year ? 1 : b.year > a.year ? -1 : 0;
	}

}
