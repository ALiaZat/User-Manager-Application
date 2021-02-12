import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore: any;


  constructor(public db: AngularFirestore) { }


  getUsers() {
    return this.db.collection('users').snapshotChanges();
  }

  searchForUser(searchValue: string) {
    return this.db.collection('users', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  addUser(user: any) {
    // console.log(user);
    // return this.db.collection('users').add({
    //   name: user.name,
    //   email: user.email,
    //   avatar: user.avatar,
    //   role: user.role,
    //   status: user.status,
    //   crDate: user.crDate
    // });
    return new Promise<any>((resolve, reject) =>{
      this.db
          .collection("coffeeOrders")
          .add(user)
          .then(res => {}, err => reject(err));
  });
  }


}
