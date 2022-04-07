import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './../../shared/services/auth.service';
import firebase from 'firebase/compat/app';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { UserService } from './../../shared/services/user.service';
import { User } from '@firebase/auth';
import { getAuth } from "firebase/auth";



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  title = 'Locate App Angular';

  //user:any;
  users$: Observable<any>[] = [] //user$: Observable<IUser>[] = [] 
  sub:any;
  subscription1$!: Subscription;
  status: boolean = false;
  isConnected!: boolean;
  userData: any; // Save logged in user data
  displayNameObs:any;
  uniqueUser:any;
  emailVerified!:boolean;

  loggedIn = new BehaviorSubject<boolean>(false);
  currentUserSubject: any;

  currentUserSubscription!: Subscription;
  currentUser!:User;

  //auth = getAuth();
  user = this.auth.currentUser;



  clickEvent(){
      this.status = !this.status;       
  }
  
  constructor(
    public authService: AuthService, 
    public auth: AngularFireAuth,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public userService: UserService
    ) {
      //this.auth.onAuthStateChanged(user => {
        //this.currentUserSubject.next(user);
      //}, console.error);
     }

  ngOnInit(): void{
    this.currentUserSubscription = this.authService.currentUserSubject.subscribe({
      next: user => this.currentUser = <any>user,
      //next: (user: User) => this.currentUser = <any>user,
      error: console.error
    });
  console.log('auth', this.auth);
  console.log('user', this.user);


  this.subscription1$ = this.afAuth.authState.subscribe(user => {
     console.log(' this.subscription1$',  this.subscription1$);
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));

        console.log('user.emailVerified : ', this.emailVerified);
       
        //JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', '');
        //JSON.parse(localStorage.getItem('user'));
      }
    });

  this.afAuth.onAuthStateChanged((user) => {
    if (user) {
      this.loggedIn.next(true);
    } else {
      // not logged in
      this.loggedIn.next(false);
    } 
  });

  this.sub = this.afAuth.authState.subscribe((user:any) => {
  //console.log('USER-UID', this.userService.readUserWithUID(user.uid));
  this.user = user;
    if (this.user) {
         console.log(this.userService.readUserWithUID(user.uid));
         console.log('EMAIL VERIFIED ?')
         console.log(this.userService.readUserWithUID(user.emailVerified));
this.emailVerified = user.emailVerified
        this.sub = this.userService.readUserWithUID(user.uid).subscribe( //Question : à propos de this.sub que j'ai écrit 2 fois
          (data) => {

            console.log('ngOnInt readUserWithUID / data', data);
            this.uniqueUser = data;
            console.log('user data : -> ', this.user);
            console.log('mes users$ OBSERVABLE : -> ', this.users$);
      
            this.displayNameObs = data;
            console.log('this.displayNameObs :', this.displayNameObs)
            if (!data || data.length === 0) {
              console.log(`Creating a new personal user for ${user.displayName}`);
              this.userService.createUser(this.uniqueUser);
            }
          },
          (err) => {
            console.error('readUserWithUID error', err);
          }
        );
      }
    });

    
  }

  public isLoggedIn(): boolean {
    return !this.afAuth.currentUser;
  }

  logout(){
    this.authService.SignOut();
  }

  ngOnDestroy() {
    //this.subscription1$.unsubscribe();
    //console.log('this.subscription1$ unsubscribe ?',  this.subscription1$);
    this.currentUserSubscription.unsubscribe();
}

}
