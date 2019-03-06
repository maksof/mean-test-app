import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { ActivatedRoute, Routes, Router } from '@angular/router';
/* Importing Environments */
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable({
	providedIn: 'root'
})
export class AppService {
	urlBase = 'http://localhost:3000/api/';
	constructor(private http: Http, public router: Router, public notificationService: NotificationsService,) { }

	get(url) {
		const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') });
		const options = new RequestOptions({ headers: headers });

		return this.http.get(this.urlBase + url, options)

		.map((res: Response) => {
			var data = res.json();
			return data;
		}).catch((error: any) => {
			console.log("error:", error);
			let errorDetail = {error: error.json(), status: error.status};
			return Observable.throw(errorDetail);
		});
	}

	post(url, data) {
		const headers = new Headers({ 'Content-Type': 'application/json', 'token': localStorage.getItem('token') });
		const options = new RequestOptions({ headers: headers });

		return this.http.post(this.urlBase + '' + url, data, options)
		.map((res: Response) => {
			var postRes = res.json();
			postRes.request = data;
			return postRes;
		}) 
		.catch((error: any) => {
			let errorDetail = {error: error.json(), request: data, status: error.status};
			return Observable.throw(errorDetail);
		});
	}
	put(url, data) {
		const headers = new Headers({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", 'token': localStorage.getItem('token') });
		const options = new RequestOptions({ headers: headers });

		return this.http.put(this.urlBase + '' + url, data, options) 
		.map((res: Response) => res.json()) 
		.catch((error: any) => Observable.throw({error: error.json(), status: error.status})); 

	}

	delete(url) {
		const headers = new Headers({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", 'token': localStorage.getItem('token') });
		const options = new RequestOptions({ headers: headers });

		return this.http.delete(this.urlBase + '' + url, options) 
		.map((res: Response) => res.json()) 
		.catch((error: any) => Observable.throw({error: error.json(), status: error.status})); 
	}
}
