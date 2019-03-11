import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Md5} from 'ts-md5/dist/md5'
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppService } from './app.service';
@Injectable({
	providedIn: 'root'
})
export class SharedService {
	constructor(private appService: AppService, private http: Http) { }

	registerUser(signupObj){
		var obj = {
			first_name : signupObj.firstName,
			last_name : signupObj.lastName,
			password : signupObj.password,
			gender : signupObj.gender,
			age : signupObj.age,
			email : signupObj.Email,
			phone : signupObj.mobileNumber
		}
		return this.appService.post("user/signup",obj);
	}
	login(login){
		var md5 = new Md5();
		login.password = md5.appendStr(login.password).end();
		return this.appService.post("user/login",login);
	}
	getAllCategories(){
		return this.appService.get("movies/getAllCategories");
	}
	getAllTimePeriod(){
		return this.appService.get("movies/getAllTimePeriods");
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
	suggestMovie(obj){
		return this.appService.post("movies/suggestMovie",obj);
	}
	acceptSuggestedMovies(id){
		return this.appService.get("movies/acceptSuggestedMovie?movieId="+id);
	}
	rejectSuggestedMovies(id){
		return this.appService.get("movies/rejectSuggestedMovie?movieId="+id);
	}
	addToFavourite(obj){
		return this.appService.post("movies/addMovieToFavorites",obj);
	}
	getAllFavoriteMovies(id){
		return this.appService.get("movies/getAllFavoritesMoviesOfUser?userId="+id);
	}
	removeFavoriteMovie(obj){
		return this.appService.post("movies/removeMovieFromFavorites",obj);
	}
	searchMovies(category, title){
		return this.appService.get("movies/getMovies?categoryId="+category+"&title="+title);
	}
	changePassword(obj){
		var md5 = new Md5();
		obj.password = md5.appendStr(obj.password).end();
		obj.oldPassword = md5.appendStr(obj.oldPassword).end();
		return this.appService.post("user/changePassword",obj);
	}
	editProfile(obj){
		return this.appService.post("user/updateProfile",obj);
	}
}
