import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './shared/services/auth.service';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Authentication';
  status: boolean = false;
  isConnected!: boolean;
  userData: any; // Save logged in user data

  

  clickEvent(){
      this.status = !this.status;       
  }
  
  constructor(public authService: AuthService, public auth: AngularFireAuth,     public afAuth: AngularFireAuth, // Inject Firebase auth service
    ) { 
    }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
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
    })
  }

  logout(){
    this.authService.SignOut();
  }
}
