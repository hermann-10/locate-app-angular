import { Injectable, NgZone } from '@angular/core';
import { User } from "../interface/user";
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  currentUserSubject = new BehaviorSubject<any | null>(null);
  //currentUserSubject = new BehaviorSubject<any>(null);

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {    

    this.afAuth.onAuthStateChanged(user => { //onAuthStateChanged detect the state change of the connexion of a user
      this.currentUserSubject.next(user);
    }, console.error);

    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        //JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', '');
        //JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  /*SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result: { user: any; }) => {
        this.ngZone.run(() => {

          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error: { message: any; }) => {
        window.alert(error.message)
        console.log(error.message);
      })
  }*/
  SignIn(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result: { user: any; }) => {
        this.ngZone.run(() => {

          resolve();
          this.router.navigate(['dashboard']);
        });
        //this.SetUserData(result.user);
      }).catch((error: { message: any; }) => {
        reject();
        window.alert(error.message)
        console.log(error.message);
      })
    });
  }


  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result:any) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

   // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u?.sendEmailVerification())
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail:any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error:any) => {
      window.alert(error)
    })
  }

  // Sign in with Google
  GoogleAuth() {
    
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider())
    .then((result:any) => { //check ici ? //commentaire
      this.SetUserData(result.userData); //commentaire
    console.log('this.SetUserData',result.userData); //commentaire
    });
  }  

  // Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }  

  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    return this.afAuth.signInWithPopup(provider)
    .then((result:any) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  get isLoggedIn(): boolean {

  const user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(user => {
    /*if(user?.emailVerified){
      console.log('email is verified');
    }else{
      console.log('email not verified');
      //window.alert('Please validate your account in the email you receive');
    }*/
  })   
  //const user = JSON.parse(localStorage.getItem('user'));
  //const user = localStorage.getItem('user');
  return (user !== null && user.emailVerified !== false) ? true : false;
   //return (user !== null) ? true : false;
}

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any /*firebase.User | null*/) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`table-users/${user.uid}`);
    const userData: any/*User*/ = {
     uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      //emailVerified: user.emailVerified,
      //isAdmin: false, //IsAdmin is false at the beginning
      //photoURL: user.photoURL,
      createdAt: new Date(),
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user'); //to test if it's useful
     
      this.router.navigate(['sign-in']);
     
      //I found that when I log out the side bar is present despite my condition to display it only when the user is connected. 
      //At the beginning it works well but when I disconnect it remains displayed. But if I refresh the page, the sidebar disappears.
      //https://stackoverflow.com/questions/47813927/how-to-refresh-a-component-in-angular
      //location.reload(); //I added this piece of code to reload the page to make the side bar disappear
    })
  }

}
