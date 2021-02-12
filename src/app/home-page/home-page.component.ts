import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  
  searchValue: any;
  users: Array<any> = [];
  name_filtered_users: Array<any> = [];

  userForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    role: new FormControl('',[Validators.required]),
    avatar: new FormControl('',[Validators.required]),
    status: new FormControl('',[Validators.required]),
    crDate: new FormControl('',[Validators.required]),

    },);
    constructor(private formBuilder: FormBuilder,public firebaseService: FirebaseService) { }

    ngOnInit() {
      this.getData();
    }
  
    onSubmit(){
      this.firebaseService.addUser(this.userForm.value);
    }
    getData(){
      this.firebaseService.getUsers()
      .subscribe(result => {
        this.users = result;
        this.name_filtered_users = result;
      })
    }

    searchByName(){
      let value = this.searchValue.toLowerCase();
      this.firebaseService.searchForUser(value)
      .subscribe(result => {
        this.name_filtered_users = result;
        this.users = result;
      })
    }
    

  get f() { return this.userForm.controls; }

}
