import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkdownModule } from 'ngx-markdown';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), 
    AngularFirestoreModule, 
    AngularFireAuthModule, 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
