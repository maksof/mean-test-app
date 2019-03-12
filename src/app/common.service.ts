import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { SharedService } from './shared.service';

@Injectable({
	providedIn: 'root'
})
export class CommonService {
	constructor(private httpService: AppService, public sharedService:SharedService) { }

	checkValidEmail(email){
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			return true;
		} else {
			return false;
		}
	}

	required(data){
		if (data == undefined || data == null || data == "") {
			return false;
		} else {
			return true;
		}
	}

	checkValidMobileNumber(mobileNumber) {
		if(mobileNumber){
			if(mobileNumber.toString().length == 10){
				return true;
			} else { 
				return false;
			}
		}
	}	
	getCurrentYear(){
		var d = new Date();
		var currentYear = d.getFullYear();
		return currentYear;
	}
	formateDate(date){			
		date = new Date(date);
		var day = date.getDate() < 10 ? '0'+date.getDate(): date.getDate();
		var month = date.getMonth()+1;
		month = month < 10 ? '0'+month: month;
		var year = date.getFullYear();
		return year + '-' + month + '-' +day;
	}
}
