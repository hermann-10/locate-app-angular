import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import  {  AngularFireAuthGuard, hasCustomClaim  }  from  '@angular/fire/compat/auth-guard' ;

import { environment } from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutComponent } from './components/about/about.component';
import { AgorespaceComponent } from './components/agorespace/agorespace.component';
import { ParcWorkoutComponent } from './components/parc-workout/parc-workout.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgorespaceDetailComponent } from './components/agorespace/agorespace/agorespace-detail/agorespace-detail.component';


const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'agorespace', component: AgorespaceComponent, canActivate: [AuthGuard] },
  { path: 'agorespace-detail/:id', component: AgorespaceDetailComponent },
  { path: 'parc-workout', component: ParcWorkoutComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
 // { path: '', component: DashboardComponent, canActivate: [AuthGuard] }, //Temporary
  { path: '**', component: PageNotFoundComponent },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },


]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SidebarComponent,
    AboutComponent,
    AgorespaceComponent,
    ParcWorkoutComponent,
    ProfilComponent,
    ContactComponent,
    FooterComponent,
    AgorespaceDetailComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
