import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  [x: string]: any;



  usersList!: AngularFireList<any>;
  user!: AngularFireObject<any>;

  constructor(private afs: AngularFireDatabase) { }

  addUser(user: User) {
    this.afs.list('/users').push({
      $id: user.$id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      status: user.status,
      crdate: user.crDate,
    })
  }

  getUser(id: string) {
    this.user = this.afs.object('users-list/' + id);
    return this.user;
  }
  getAllUsers() {
    this.usersRef = this.afs.list('users-list');
    return this.usersList;
  }
  updateUser(user: User) {
    this.user.update({
      $id: user.$id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      status: user.status,
      crdate: user.crDate,
    })
  }
  deleteUser(id: string) {
    this.userRef = this.afs.object('users-list/' + id);
    this.userRef.remove();
  }

  // userCollection: AngularFirestoreCollection<User>;
  // users: Observable<User[]>;
  // userDoc: AngularFirestoreDocument<User>;

  // constructor(public afs: AngularFirestore) { 
  //   // this.users = this.afs.collection('users').snapshotChanges();

  //   this.userCollection = this.afs.collection('users', ref => ref.orderBy('name','asc'));

  //   this.users = this.userCollection.snapshotChanges().map((changes: any[]) => {
  //     return changes.map((a: { payload: { doc: { data: () => User; id: string; }; }; }) => {
  //       const data = a.payload.doc.data() as User;
  //       data.$id = a.payload.doc.id;
  //       return data;
  //     });
  //   });
  // }

  // getUsers(){
  //   return this.users;
  // }

  // addUser(user: User){
  //   this.userCollection.add(user);
  // }

  // deleteUser(user: User){
  //   this.userDoc = this.afs.doc(`items/${user.$id}`);
  //   this.userDoc.delete();
  // }

  // updateUser(user: User){
  //   this.userDoc = this.afs.doc(`items/${user.$id}`);
  //   this.userDoc.update(user);
  // }

}



