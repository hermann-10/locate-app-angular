import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './shared/services/auth.service';
import firebase from 'firebase/compat/app';
import { Observable, Subscription } from 'rxjs';
import { UserService } from './shared/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Locate App Angular';

  user:any;
  users$: Observable<any>[] = [] //user$: Observable<IUser>[] = [] 
  sub:any;
  subscription1$!: Subscription;
  status: boolean = false;
  isConnected!: boolean;
  userData: any; // Save logged in user data
  displayNameObs:any;
    uniqueUser:any;


  
  clickEvent(){
      this.status = !this.status;       
  }
  
  constructor(
    public authService: AuthService, 
    public auth: AngularFireAuth,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public userService: UserService
    ) { }

  ngOnInit() {
   this.subscription1$ = this.afAuth.authState.subscribe(user => {
     console.log(' this.subscription1$',  this.subscription1$);
      if (user) {
        this.userData = user;
        this.isConnected = this.authService.isLoggedIn;
        console.log('Logged ?',  this.authService.isLoggedIn)
        console.log('user.emailVerified : ', user.emailVerified);
        localStorage.setItem('user', JSON.stringify(this.userData));
        //JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', '');
        //JSON.parse(localStorage.getItem('user'));
      }
    });

      this.sub = this.afAuth.authState.subscribe((user:any) => {
               console.log('USER-UID', this.userService.readUserWithUID(user.uid));

               this.user = user;

    if (this.user) {
         console.log(this.userService.readUserWithUID(user.uid));

        this.sub = this.userService.readUserWithUID(user.uid).subscribe( //Question : à propos de this.sub que j'ai écrit 2 fois
          (data) => {

            console.log('ngOnInt readUserWithUID / data', data);
            this.uniqueUser = data;

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

  logout(){
    this.authService.SignOut();
  }

  ngOnDestroy() {
    this.subscription1$.unsubscribe();
    console.log(' this.subscription1$ unsubscribe ?',  this.subscription1$);
}

}
