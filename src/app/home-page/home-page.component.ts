import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  
  searchValue = "";

  userForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    role: new FormControl('',[Validators.required]),
    avatar: new FormControl('',[Validators.required]),
    status: new FormControl('',[Validators.required]),
    crDate: new FormControl('',[Validators.required]),

    },);
    
    user: User = {
      $id:'',
      name: '',
      avatar:'',
      email:'',
      role:'',
      status:'',
      crDate:''
    }
    submitted: boolean = false;
    imageUrl: any;

    constructor(private fbs: FirebaseService) { }
  
    ngOnInit() {
      this.fbs.getAllUsers();
      this.userForm;
    }
  
    // onSubmit(){
    //   if(this.user.name != '' && this.user.avatar != '' && this.user.email != '' && this.user.role != '' && 
    //   this.user.status != '' && this.user.crDate != ''){
    //     this.asf.addUser(this.userForm.value);
    //     this.user.$id = '';
    //     this.user.name = '';
    //     this.user.email = '';
    //     this.user.role = '';
    //     this.user.status = '';
    //     this.user.crDate = '';
    //   }
    // }
    
  onSubmit() {
    console.warn(this.userForm.value);
      this.submitted = true;
      if (this.userForm.invalid) {
        this.fbs.addUser(this.userForm.value);
      }
  }

  selectFile(event : any) {
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			return;
		}
		var mimeType = event.target.files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			return;
		}
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.onload = (_event) => {
			this.imageUrl = reader.result; 
		}
    
  }

}
