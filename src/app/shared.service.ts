import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppService } from './app.service';
@Injectable({
	providedIn: 'root'
})
export class SharedService {

	constructor(private appService: AppService, private http: Http) { }

	getTestApi(){
		return this.appService.get("functionName");
	}
	postTestApi(obj){
		return this.appService.post("functionName",obj);
	}
	deleteTestApi(){
		return this.appService.delete("");
	}
	updateTestApi(obj){
		return this.appService.post("functionName",obj);
	}
}