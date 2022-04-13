import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './shared/services/in-memory-data.service';
// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import  { AngularFireAuthGuard, hasCustomClaim }  from '@angular/fire/compat/auth-guard' ;
//import { environment } from '../environments/environment';
import { environment } from '../environments/environment.prod';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AboutComponent } from './components/about/about.component';
import { AgorespaceComponent } from './components/agorespace/agorespace.component';
import { ParcWorkoutComponent } from './components/parc-workout/parc-workout.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AgorespaceDetailComponent } from './components/agorespace/agorespace/agorespace-detail/agorespace-detail.component';
import { AgoraSearchComponent } from './components/agorespace/agora-search/agora-search.component';
import { NavComponent } from './components/nav/nav.component';
import { AnnonceComponent } from './components/annonce/annonce.component';
import { AddAnnonceComponent } from './components/annonce/add-annonce/add-annonce.component';
import { AdminComponent } from './components/admin/admin.component';

import { registerLocaleData } from '@angular/common';
import localFr from '@angular/common/locales/fr';
import { FirstCharUppercasePipe } from './pipes/first-char-uppercase.pipe';
import { UppercaseInputDirective } from './directives/uppercase-input.directive'


registerLocaleData(localFr);

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'}, //Adding a default route
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  //{ path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./admin.module').then(m => m.AdminModule) }, //Lazy Loading

  { path: 'agorespace', component: AgorespaceComponent, canActivate: [AuthGuard] },
  { path: 'agorespace-detail/:id', component: AgorespaceDetailComponent },
  { path: 'agorespace-search', component: AgoraSearchComponent, canActivate: [AuthGuard] },
  { path: 'parc-workout', component: ParcWorkoutComponent, canActivate: [AuthGuard] },
  { path: 'annonce', component: AnnonceComponent, canActivate: [AuthGuard] },
  { path: 'add-annonce', component: AddAnnonceComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'admin', component: AdminComponent},
  { path: '**', component: PageNotFoundComponent },
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
    AgoraSearchComponent,
    NavComponent,
    AnnonceComponent,
    AddAnnonceComponent,
    FirstCharUppercasePipe,
    UppercaseInputDirective,
    AdminComponent,
    PageNotFoundComponent
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FontAwesomeModule,
    NgbModule,
    Ng2TelInputModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,

    AppRoutingModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
