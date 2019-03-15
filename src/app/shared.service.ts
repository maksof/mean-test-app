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
		return this.appService.post("user/signup",signupObj);
	}
	login(login){
		var md5 = new Md5();
		var obj:any = {};
		obj.password = md5.appendStr(login.Password).end();
		obj.email = login.email;
		return this.appService.post("user/login",obj);
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
	getAllMovies(userId){
		return this.appService.get("movies/getMovies?userId="+userId);
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
	searchMovies(category, title,userId){
		return this.appService.get("movies/getMovies?categoryId="+category+"&title="+title+"userId"+userId);
	}
	changePassword(obj){
		var md5 = new Md5();
		var md6 = new Md5();
		var cObj:any = {};
		cObj.oldPassword = md5.appendStr(obj.old).end();
		cObj.password = md6.appendStr(obj.Password).end();
		cObj.email = obj.email;
		return this.appService.post("user/changePassword",cObj);
	}
	editProfile(obj){
		return this.appService.post("user/updateProfile",obj);
	}
	viewGrade(limit,offset){
		return this.appService.get("movies/viewGradeMovies?limit="+limit+"&offset="+offset);
	}
	rateMovie(obj){
		return this.appService.post("movies/gradeMovies",obj);
	}
	getMoviesOnTimePeriod(id){
		return this.appService.get("movieWithTimePeriodBasis?periodId="+id);
	}
}
