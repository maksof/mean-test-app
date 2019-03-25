import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { SharedService } from './shared.service';
import { CommonService } from './common.service';
import {NotificationsService, SimpleNotificationsComponent} from 'angular2-notifications';

@Injectable()
export class AuthGuardService {

    constructor( public notificationService: NotificationsService, private apiService: SharedService, private commonService: CommonService, public router: Router) { }

    canActivate(router: ActivatedRouteSnapshot): boolean {
    	
        var user = JSON.parse(localStorage.getItem('user'));
        if(!this.commonService.isEmpty(user)) {            
            return true;
        } else {
        	this.commonService.logoutUser();
        	return false;
        }
    }
}