import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  subscription1$!: Subscription;
  status: boolean = false;
  isConnected!: boolean;
  userData: any; // Save logged in user data

  
  clickEvent(){
      this.status = !this.status;       
  }
  
  constructor(public authService: AuthService, public auth: AngularFireAuth,     public afAuth: AngularFireAuth, // Inject Firebase auth service
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
    })
  }

  logout(){
    this.authService.SignOut();
  }

  ngOnDestroy() {
    this.subscription1$.unsubscribe();
    console.log(' this.subscription1$ unsubscribe ?',  this.subscription1$);
}

}
