import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';
import { NamePage } from '../pages/name/name';
import { ResultPage } from '../pages/result/result';
import { InteractionPage } from '../pages/interaction/interaction';
import { EvaluationPage } from '../pages/evaluation/evaluation';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'

var config = {
    apiKey: "AIzaSyBSK26whtlxU3IMmLk9EdyFs7jNUcBfL1I",
    authDomain: "hpiuser-7a9b0.firebaseapp.com",
    databaseURL: "https://hpiuser-7a9b0.firebaseio.com",
    projectId: "hpiuser-7a9b0",
    storageBucket: "hpiuser-7a9b0.appspot.com",
    messagingSenderId: "226327850612"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    NamePage,
    ResultPage,
    InteractionPage,
    EvaluationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    NamePage,
    ResultPage,
    InteractionPage,
    EvaluationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
