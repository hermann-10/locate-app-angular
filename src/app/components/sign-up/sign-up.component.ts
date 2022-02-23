import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { AngularFireAuth } from  '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import Validation from './../utils/validation';

import firebase from 'firebase/compat/app';
import { Subscription } from 'rxjs';
import { user } from '@angular/fire/auth';
import { UserService } from 'src/app/shared/services/user.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit/*, OnDestroy */ {

    collectionName = 'table-users';

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
  phoneNumberInput = '';
  passwordInput = '';
  confirmPasswordInput= '';
  submitted! : boolean;

  
  constructor(
        public authService: AuthService,
        private userService: UserService,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
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

       phoneNumber: new FormControl(this.phoneNumberInput,[
        Validators.required,
        //Validators.minLength(3)
      ]),
  
      password: new FormControl(this.passwordInput,[
        Validators.required,
        Validators.minLength(6)
      ]),

      confirmPassword: new FormControl(this.confirmPasswordInput,[
        Validators.required,
        //Validators.minLength(6)
      ]),

    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    }
    );
  }

    get email() { return this.registerForm.get('email'); }
    get name() { return this.registerForm.get('name'); }
     get phoneNumber() { return this.registerForm.get('phoneNumber'); }
   get password() { return this.registerForm.get('password'); }
   get confirmPassword() { return this.registerForm.get('confirmPassword'); }

   async register(){

    this.submitted = true;

    if (!this.registerForm.valid) {
      return;
    }

    const email = this.registerForm.value.email;
    const displayName = this.registerForm.value.name;
    const phoneNumber = this.registerForm.value.phoneNumber;
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;

this.result = await this.afAuth.createUserWithEmailAndPassword(email, password);    

     if(this.result) {

    this.createdAt = new Date();
    const userCreated = await this.userService.createUser({ //spread operator.. 
      ...this.result.user,
      uid:this.result.user.uid,
      email:email,
      displayName: displayName,
      phoneNumber: phoneNumber, 
    });

    console.log('userCreated', userCreated);
            this.authService.SendVerificationMail();

    this.result = null;
  }
}

 onReset() {
  this.submitted = false;
  this.registerForm.reset();
  }

/*ngOnDestroy() {
    this.userSub.unsubscribe();
  }*/
}
