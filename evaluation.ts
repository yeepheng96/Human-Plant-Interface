import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { MainPage } from '../main/main';

@IonicPage()
@Component({
  selector: 'page-evaluation',
  templateUrl: 'evaluation.html',
})
export class EvaluationPage {

  currentRate;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public alertCtrl: AlertController,
  public afd: AngularFireDatabase) {
    this.getRate();
  }

  getRate(){
    this.afd.list('/overallRates/').valueChanges().subscribe( // DHT11 selected firebase
      data =>{
        console.log(data)
        var numRate = +data;   //Change to number *IMPORTANT
        this.currentRate = numRate; // Affect the result *IMPORTANT
      }
    )
  }

  btnRate(){
    this.currentRate = this.currentRate + 1;
    this.currentRate = this.currentRate.toString();
    this.afd.list("/overallRates/").set("rate",this.currentRate);

    let alert = this.alertCtrl.create({
      title: 'Evaluated Message',
      message: 'Thank you for your support!',
      buttons: ['OK']
    });

    alert.present();
    this.navCtrl.setRoot(MainPage, {currentRate:this.currentRate});
  }

  btnUnrate(){
    this.currentRate = this.currentRate - 1;
    this.currentRate = this.currentRate.toString();
    if(this.currentRate!=-1){
      this.afd.list("/overallRates/").set("rate",this.currentRate);
    }

    let alert = this.alertCtrl.create({
      title: 'Evaluated Message',
      message: 'Thank you for your support!',
      buttons: ['OK']
    });

    alert.present();
    this.navCtrl.setRoot(MainPage, {currentRate:this.currentRate});
  }

  backMain(){
    this.navCtrl.setRoot(MainPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvaluationPage');
  }

}
