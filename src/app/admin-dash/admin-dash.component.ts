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
	//timeperiodDataTypes
	defaultTimePeriodId;
	timeperiod;
	selectedTPmovies = [];
	showLoader:boolean = false;

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
	public barColors: Array<any> = [
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
	public barChartLabels:string[] = [];
	public barChartType:string = 'bar';
	public barChartLegend:boolean = true;
	public barChartData: any[] = [
	{data: Array<any>(), label:'Rating', backgroundColor: ['#163293']}
	];

	//timeperiod Bar Chat Data
	public barChartLabelsTimePeriod:string[] = [];
	public barChartLegendTime: boolean = true;
	public barChartDataTimePeriod: any[] = [
	{data:Array<any>(), label:'Rating', backgroundColor: ['#163293']}
	];

	// Age Bar Chart Data
	public barChartLabelsAge:string[] = [];
	public barChartLegendAge: boolean = true;
	public barChartDataAge: any[] = [
	{data:Array<any>(), label:'Rating', backgroundColor: ['#163293']}
	];

	// Gender Bar Chart Data
	public barChartLabelsGender:string[] = ["Male", "Female"];
	public barChartLegendGender: boolean = true;
	public barChartDataGender: any[] = [
	{data:Array<any>(), label:'Rating', backgroundColor: ['#163293']}
	];

	mainToggle:boolean = true;
	
	ngOnInit() {
		this.getAllGenderBasisRecord();
		this.getAgeWiseDataForBarChart();
		this.getCategoriesData();
		this.getAllCategoriesData();
		this.getTimePeriodData();
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
			for (var i = 0; i < this.categoriesDataWithId.length; i++) {
				for (var j = 0; j < allCategories.length; j++) {
					if(this.categoriesDataWithId[i].id == allCategories[j].categoryId){
						count++;
						if (allCategories[j].avg != "") temp += allCategories[j].avg;
					}
				};
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

	getTimePeriodData(){
		this.sharedService.getAllTimePeriod().subscribe(res=>{
			this.timeperiod = res.data;
			if(this.timeperiod)this.getAllTimePeriodsDataById(this.timeperiod[0].id);
		},(error)=>{
			this.notificationService.error('Internal Server Error', {
				duration: 2000,
			});
		});
	}

	getAllTimePeriodsDataById(id){
		var DataBarChart = [];
		var temp = 0;
		var count = 0;
		this.barChartLabelsTimePeriod = this.setYearForTimePeriods(id);
		this.sharedService.getMoviesOnTimePeriod(id).subscribe(res=>{
		this.selectedTPmovies = res.movies;
		if(this.selectedTPmovies){
			for (var i = 0; i < this.barChartLabelsTimePeriod.length; i++) {
				for (var j = 0; j < this.selectedTPmovies.length; j++) {
					if(this.barChartLabelsTimePeriod[i] == this.selectedTPmovies[j].year){
						count++;
						if (this.selectedTPmovies[j].avg != "") temp += this.selectedTPmovies[j].avg;
					}
				};
				if(count != 0) temp = (temp/count);
				DataBarChart.push(temp);
				temp = 0;
				count = 0;
			}; 
		} else{ 
			this.notificationService.error('No record found');

		}
			this.barChartDataTimePeriod[0].data = DataBarChart;
			var clone = JSON.parse(JSON.stringify(this.barChartDataTimePeriod));
			this.barChartDataTimePeriod = clone;
		},(error)=>{
			this.notificationService.error('Internal Server Error', {
				duration: 2000,
			});
		});
	}

	setYearForTimePeriods(id){
		var selectedTimePeriod;
		var dataRaneForChart = [];
		for(var i = 0; i < this.timeperiod.length; i++){
			if(this.timeperiod[i].id == id){
				selectedTimePeriod = this.timeperiod[i].timePeriod;
			}
		}
		var dateRange = selectedTimePeriod.split("-");
		dateRange.sort();
		if (dateRange){
		var startDate = parseInt(dateRange[0]);
		var lastData = parseInt(dateRange[1])
		}
		for(var i = startDate; i < lastData+1; i++){
			dataRaneForChart.push(i);
		}
		return dataRaneForChart;
	}

	getAgeWiseDataForBarChart(){
		var ages = [];
		var data= [];
		var DataBarChart = [];
		var temp = 0;
		var count = 0;
		this.sharedService.getAgeWiseData().subscribe(res=>{
		data = res.stats;
		data.sort(this.sortArr);
		data.forEach(function(row){
			var index = ages.map(function(item){
                return item;
            }).indexOf(row.age);
            if(index == -1){
                ages.push(row.age);
            }
        });
        this.barChartLabelsAge = ages;
        if(data){
			for (var i = 0; i < this.barChartLabelsAge.length; i++) {
				for (var j = 0; j < data.length; j++) {
					if(this.barChartLabelsAge[i] == data[j].age){
						count++;
						if (data[j].avg != "") temp += data[j].avg;
					}
				};
				if(count != 0) temp = (temp/count);
				DataBarChart.push(temp);
				temp = 0;
				count = 0;
			}; 
		} else{ 
			this.notificationService.error('No record found');
		}
			this.barChartDataAge[0].data = DataBarChart;
			var clone = JSON.parse(JSON.stringify(this.barChartDataTimePeriod));
			this.barChartDataTimePeriod = clone;

		},(error)=>{
			this.notificationService.error('Internal Server Error', {
				duration: 2000,
			});
		});
	}

	sortArr(a, b) {
      return a.age === null? 1 : b.age === null? -1 : a.age > b.age ? 1 : b.age > a.age ? -1 : 0;
    }

    getAllGenderBasisRecord(){
    	var data = [];
    	var DataBarChart = [];
    	this.sharedService.getAllGenderRec().subscribe(res=>{
		data = res.data;
		if(data){
			DataBarChart[0] = data[0].male;
			DataBarChart[1] = data[0].female;
			DataBarChart[2]	= 0;
			this.barChartDataGender[0].data = DataBarChart;
			var clone = JSON.parse(JSON.stringify(this.barChartDataGender));
			this.barChartDataGender = clone;

		} else{ 
			this.notificationService.error('No record found');
		}			
		},(error)=>{
			this.notificationService.error('Internal Server Error', {
				duration: 2000,
			});
		});
    }
}
