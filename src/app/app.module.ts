import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HttpClientModule } from '@angular/common/http';
import {environment} from '../environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  imports: 
  [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase )),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
