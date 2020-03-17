import { RegisterComponent } from './../register/register.component';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  values: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.getValues();
  }

  registerToggle() {
   // this.registerMode = !this.registerMode;
   this.registerMode = true;
  }
  
  cancelRegisterMode(registerMode: boolean){
    this.registerMode = registerMode;
  /* getValues(){
    this.http.get('http://localhost:60885/api/values').subscribe(response=>{
        this.values = response; }, error =>  //   {    console.log(error);   });  }
  */
  
  }
}
