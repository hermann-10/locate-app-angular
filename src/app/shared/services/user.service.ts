import { Injectable } from '@angular/core';
import { User } from "../model/user";
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users!: Observable<User[]>;
  collectionName = 'table-users';
  result: any;
  registerForm!: FormGroup;

  constructor(private afs: AngularFirestore, private router: Router, private afAuth: AngularFireAuth) { }

  createUser (user: { uid: any, displayName: any, email: any, /*emailVerified: any;*/telephone: any, createdAt: Date,  }) { //créer l'utilisateur dans une collection
      const  newUser = {
      uid: user.uid, //Je prends ici l'id de l'utilisateur
      displayName: user.displayName,
      email: user.email,
      //emailVerified: user.emailVerified,
      //isAdmin: false,
      telephone: user.telephone,
      createdAt: new Date(),
    }

    const usersCollection = this.afs.collection(`${this.collectionName}`);
    return usersCollection.add(newUser);
  }

   getUsers() {
    return this.afs.collection(`${this.collectionName}`).valueChanges({ idField: 'id'});
  }

  getUser(id: any) {
    return this.afs.doc(`${this.collectionName}/${id}`).valueChanges();
  }

  readUser() {
    return this.afs.collection(`${this.collectionName}`, (ref) => 
      ref.orderBy('createdAt', 'desc')
    );
  }

  /*
  readUserWithUID(uid: string) {
    return this.afs
      .collection(`${this.collectionName}`, (ref) => ref.where('uid', '==', uid))
      .valueChanges({ idField: 'id' });
      
    }
  */
}
