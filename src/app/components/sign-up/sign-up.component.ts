import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { AngularFireAuth } from  '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { Subscription } from 'rxjs';
import { user } from '@angular/fire/auth';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit/*, OnDestroy */ {

  result: any;
  resultUser: any;
  errorMessage: string = '';
  createdAt!: any;
  user:any;
  userUID:any;
  userDisplayName:any;
  userPhotoURL:any;
  currentUser!: firebase.User;
  userSub!: Subscription;
  registerForm!: FormGroup;

  nameInput = '';
  emailInput = '';
  passwordInput = '';
  submitted! : boolean;

  
  constructor(
        public authService: AuthService,
        private fb: FormBuilder, 
        private router : Router
  ) { }

   ngOnInit() {
     this.registerForm = new FormGroup({
      email: new FormControl(this.emailInput,[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),

       name: new FormControl(this.nameInput,[
        Validators.required,
        Validators.minLength(3)
      ]),
  
      password: new FormControl(this.passwordInput,[
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

    get email() { return this.registerForm.get('email'); }
    get name() { return this.registerForm.get('name'); }
   get password() { return this.registerForm.get('password'); }

   register(){
     console.log('Hallo Register ?')

    this.submitted = true;

    if (!this.registerForm.valid) {
      return;
    }

    const email = this.registerForm.value.email;
    const name = this.registerForm.value.name;
    const password = this.registerForm.value.password;

    this.result = this.authService.SignUp(email, password)
    .then(
      () => {
        //this.authService.SetUserData(this.result);
        console.log('User created:', this.result);
      }
    ).catch(
      (error) => {
        this.errorMessage = error;
        console.log(error);
      }
    )

   
  }
   onReset() {
  this.submitted = false;
  this.registerForm.reset();
   }
/*ngOnDestroy() {
    this.userSub.unsubscribe();
  }*/
}
