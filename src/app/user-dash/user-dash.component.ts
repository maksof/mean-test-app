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
	public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		scaleShowVerticalLines: false;
	public lineChartOptions:any = {
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
		}, line : { 
			tension : 0 
		} 
	};
	public chartColors: Array<any> = [
	{ // first color
		backgroundColor: 'rgba(225,10,24,0.2)',
		borderColor: 'rgba(225,10,24,0.2)',
		pointBackgroundColor: 'rgba(225,10,24,0.2)',
		pointBorderColor: '#fff',
		pointHoverBackgroundColor: '#fff',
		pointHoverBorderColor: 'rgba(225,10,24,0.2)'
	}	];
	public lineChartType:string = 'line';
	public lineChartLegend:boolean  = true;
	 // lineChart
	public lineChartData:Array<any> = [{data: [6500, 5900, 8000, 8100, 5600, 5500, 4000, 900, 9500 , 10005, 5400, 6500], label: 'Ranking'}];
	// pie chart Varibales
	public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
	public pieChartData:number[] = [300, 500, 100];
	public pieChartType:string = 'pie';

	// doghnut chart Varibales
	public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
	public doughnutChartData:number[] = [350, 450, 100];
	public doughnutChartType:string = 'doughnut';

	mainToggle:boolean = true;
	
	ngOnInit() {
		this.notificationService.info("Notification","Test");
	}

	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}

}
