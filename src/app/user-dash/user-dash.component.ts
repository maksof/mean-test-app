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
				}   
			}]
		},
	};
	public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	public barChartType:string = 'bar';
	public barChartLegend:boolean = true;
	public barChartData = [
		{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
		{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
	];

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
			console.log(res);
			this.showLoader = false;
		},(error)=>{
			this.showLoader = false;
		});
	}
}
