import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpService: AppService, public sharedService:SharedService) { }
}
