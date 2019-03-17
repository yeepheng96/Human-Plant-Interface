import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { MainPage } from '../main/main';

@IonicPage()
@Component({
  selector: 'page-name',
  templateUrl: 'name.html',
})
export class NamePage {

  myName: String = "";

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  private fdb: AngularFireDatabase,
  private vc: ViewController,
  public alertCtrl: AlertController) {
  }

  btnEnterName(myName){
    if(this.myName==""){
      let alert = this.alertCtrl.create({
      title: 'Ops!',
      message: 'Please enter your name!',
      buttons: ['OK']
    });

    alert.present();
    }
    else{
      this.fdb.list("/myNames/").push(this.myName);          // Store input data input database, doesnt affect after page display
      if(this.myName==""){
        let alert = this.alertCtrl.create({
        title: 'Hi! ',
        message: "I'm Mr Green, a plant! Come and chat with me!",
        buttons: ['OK']
        });
        alert.present();
      }
      else{
        let alert = this.alertCtrl.create({
        title: 'Hi! '+this.myName,
        message: "I'm Mr Green, a plant! Come and chat with me!",
        buttons: ['OK']
        });
        alert.present();
      }
      this.vc.dismiss({myName:this.myName})
      this.navCtrl.setRoot(MainPage, {myName:this.myName});
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NamePage');
  }

}
