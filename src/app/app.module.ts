import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { fbConfig } from './firebase-config';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { NotificationsModule } from './modules/notifications/notifications.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GetCurrentStatusColorPipe } from './modules/client-dash/pipes/folder-card.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    AuthModalComponent,
    LoginComponent,
    CreateAccountComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(fbConfig),
    NotificationsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    GetCurrentStatusColorPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
