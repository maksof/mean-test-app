import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { CommonService } from '../common.service';
import {NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';

@Component({
	selector: 'app-admin-dash',
	templateUrl: './admin-dash.component.html',
	styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {

	constructor(public sharedService:SharedService, public commonService:CommonService, public notificationService:NotificationsService) { }
	// bar chart Varibales
	categoriesData = [];
	categoriesDataWithId;
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
	public chartColors: Array<any> = [
	{ // first color
		backgroundColor: 'rgba(225,10,24,0.2)',
		borderColor: 'rgba(225,10,24,0.2)',
		pointBackgroundColor: 'rgba(225,10,24,0.2)',
		pointBorderColor: '#fff',
		pointHoverBackgroundColor: '#fff',
		pointHoverBorderColor: 'rgba(225,10,24,0.2)'
	},
	{ // second color
		backgroundColor: 'rgba(225,10,24,0.2)',
		borderColor: 'rgba(225,10,24,0.2)',
		pointBackgroundColor: 'rgba(225,10,24,0.2)',
		pointBorderColor: '#fff',
		pointHoverBackgroundColor: '#fff',
		pointHoverBorderColor: 'rgba(225,10,24,0.2)'
	}];
	public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	public barChartType:string = 'bar';
	public barChartLegend:boolean = true;
	public barChartData: any[] = [
	{data: [20,10,50,60,60,20,11], backgroundColor: ['#163293',]}
	/*{data: [], label: 'Articles', backgroundColor: ["#02abec"]},*/
	/*{data: [], label: 'Smiulation', backgroundColor: ["#89a0b0"]},*/
	];
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
		this.getCategoriesData();
		this.getAllCategoriesData();
	}

	toggleMainSec(){
		this.mainToggle = !this.mainToggle;
	}

	getCategoriesData(){
		this.sharedService.getAllCategories().subscribe(res=>{
			for (var i = 0; i < res.data.length; i++) {
				this.categoriesData.push(res.data[i].categoryName);	
			};
			this.categoriesDataWithId = res.data;
			this.barChartLabels =  this.categoriesData;

		},(error)=>{
			this.notificationService.error('Internal Server Error', {
				duration: 2000,
			});
		});
	}

	getAllCategoriesData(){
		var allCategories;
		var avgCategoriesData = [];
		var temp = 0;
		var count = 0;
		this.sharedService.getAllDataCategories().subscribe(res=>{
		allCategories = res.movies;
		console.log(this.categoriesDataWithId);
		console.log(allCategories);
			for (var i = 0; i < this.categoriesDataWithId.length; i++) {
				for (var j = 0; j < allCategories.length; j++) {
					if(this.categoriesDataWithId[i].id == allCategories[j].categoryId){
						count++;
						console.log("avg",allCategories[j].avg);
						if (allCategories[j].avg != "") temp += allCategories[j].avg;
					}
				};
				console.log("count",count);
				if(count != 0) temp = (temp/count);
				avgCategoriesData.push(temp);
				temp = 0;
				count = 0;
			};
			this.barChartData = avgCategoriesData;

		},(error)=>{
			this.notificationService.error('Internal Server Error', {
				duration: 2000,
			});
		});
	}
}
