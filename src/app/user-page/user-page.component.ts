import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { FirebaseService } from '../services/firebase-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userForm: any;
  submitted: boolean = false;
  userId: any;
  userToUpdate: any;
  noUser: boolean = false;
  noData: boolean = false;
  user: User[] = [];
  editForm: boolean = false;

  constructor(private fbs:FirebaseService){
    this.user = [];
  }
  

  get f() { return this.userForm.controls;}

  ngOnInit() {
    this.ifDataExists(); 
    let s = this.fbs.getAllUsers(); 
    s.snapshotChanges().subscribe(data => { 
      this.user = [];
      data.forEach(user => {
        let a = user.payload.toJSON(); 
        this.user.push(a as User);
      })
    })
  }
  ifDataExists() {     
    this.fbs.getAllUsers().snapshotChanges().subscribe(data => {
      
      if(data.length <= 0){
        this.noUser = false;
        this.noData = true;
      } else {
        this.noUser= true;
        this.noData = false;
      }
    })
  }


  // ngOnInit(): void {
  //   this.userId = this.fbs.currentUserIdToupdate;
  //   this.afs.getUser(this.userId).snapshotChanges().subscribe(doc => {
  //     this.userToUpdate = doc.payload.val;
  //   })
  // }

  onSubmit(newUserValue: User){
    this.submitted = true;
    if(this.userForm.valid){
    this.fbs.getUser(this.userId);
    this.fbs.UpdateUser(newUserValue);
    this.editForm = false;
    }
  }

  deleteUser(event : Event, user: User){
    this.clearState();
    this.fbs.deleteUser(user.$id);
  }

  editUser(event: Event, user: User){
    this.editForm = true;
    this.userToUpdate = user;
  }

  updateUser(user: User){
    this.fbs.updateUser(user);
    this.clearState();
  }

  clearState(){
    this.editForm = false;
    this.userToUpdate = null;
  }

  
}
