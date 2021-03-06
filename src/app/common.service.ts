import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { SharedService } from './shared.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class CommonService {
	constructor(private router: Router, private httpService: AppService, public sharedService:SharedService) { }

	checkValidEmail(email){
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			return true;
		} else {
			return false;
		}
	}
    
    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

	required(data){
		if (data == undefined || data == null || data == "") {
			return false;
		} else {
			return true;
		}
	}

    logoutUser() {
        localStorage.removeItem("user");
        this.router.navigateByUrl('/login');
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
	requiredArray(value) {
		var cond = false;
		if(value != null && value != undefined && value != '') {
			if(value.length > 0) cond = true;
		}
		return cond;        
	}
	getPager(totalItems: number, currentPage: number = 1, pageSize: number) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) { 
            currentPage = 1; 
        } else if (currentPage > totalPages) { 
            currentPage = totalPages; 
        }
        
        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}
