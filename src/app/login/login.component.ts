import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	model = {name:'abc' , pwd:'12345'};

  constructor() { }

  ngOnInit() {
  }

}
