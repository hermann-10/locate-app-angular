import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user:any;
  users$: Observable<any>[] = [] //user$: Observable<IUser>[] = [] 
  sub:any;
  uniqueUser:any;
  displayNameObs:any


  constructor(
    public authService: AuthService,
    private afAuth: AngularFireAuth,
    public userService: UserService,

  ) { }

  ngOnInit(){

  

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

}
