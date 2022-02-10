import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Authentication';

     status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }
  
  constructor(private authService: AuthService, public auth: AngularFireAuth) { }

  ngOnInit() {
  }

  logout(){
    this.authService.SignOut();
  }
}
