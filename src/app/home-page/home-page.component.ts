import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
class User {
  
  constructor (id: number, name: string, email: string, role: string){}
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  users: any;

  userForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    role: new FormControl('',[Validators.required]),
    avatar: new FormControl('',[Validators.required]),
    status: new FormControl('',[Validators.required]),
    crDate: new FormControl('',[Validators.required]),

    },);
    constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  public addUser(): void {
    let newUser = new User(2, 'name', 'email', 'role');
    this.users.push(newUser);
    console.log('user is added');
}

}
