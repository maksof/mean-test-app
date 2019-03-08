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

    
    checkValidLoginUser(loginObj){
    if (loginObj.userName != loginObj.password) {
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
}
