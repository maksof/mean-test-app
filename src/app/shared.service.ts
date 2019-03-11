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
	registerUser(signupObj){
		return this.appService.post("user/signup",signupObj);
	}
	postTestApi(obj){
		return this.appService.post("functionName",obj);
	}
	getAllCategories(){
		return this.appService.get("movies/getAllCategories");
	}
	getAllTimePeriod(){
		return this.appService.get("movies/getAllTimePeriods");
	}
	deleteTestApi(){
		return this.appService.delete("");
	}
	updateTestApi(obj){
		return this.appService.post("functionName",obj);
	}
	addNewCategory(data){
		return this.appService.post("movies/addCategory",data);
	}
	addTimePeriod(data){
		return this.appService.post("movies/addTimePeriod",data);
	}
	deleteCategory(id){
		var catId = parseInt(id);
		return this.appService.get("movies/deleteCategory?categoryId="+catId);
	}
	deleteTimePeriod(id){
		var timeId = parseInt(id);
		return this.appService.get("movies/deleteTimePeriod?timePeriodId="+timeId);
	}
	addMovies(obj){
		return this.appService.post("movies/addMovie",obj);
	}
	getAllMovies(){
		return this.appService.get("movies/getMovies");
	}
	deleteMovie(id){
		return this.appService.get("movies/deleteMovie?movieId="+id);
	}
	updateMovie(obj){
		return this.appService.post("movies/updateMovie",obj);
	}
	getSuggestedMovies(){
		return this.appService.get("movies/getSuggestedMovie");
	}
	acceptSuggestedMovies(id){
		return this.appService.get("movies/acceptSuggestedMovie?movieId="+id);
	}
	rejectSuggestedMovies(id){
		return this.appService.get("movies/rejectSuggestedMovie?movieId="+id);
	}
	searchMovies(category, title){
		return this.appService.get("movies/getMovies?categoryId="+category+"&title="+title);
	}
}
