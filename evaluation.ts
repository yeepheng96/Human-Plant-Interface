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
  rated;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public alertCtrl: AlertController,
  public afd: AngularFireDatabase) {
    this.getRate();
    this.getRated();
  }

  getRate(){
    this.afd.list('/overallRates/').valueChanges().subscribe( // Get value of current rate
      data =>{
        console.log(data)
        var numRate = +data;   //Change to number *IMPORTANT
        this.currentRate = numRate; // Affect the result *IMPORTANT
      }
    )
  }

  getRated(){
    this.afd.list('/rated/').valueChanges().subscribe( // Confirm rated value
      data =>{
        console.log(data)
        var ratedValue = data;   // Assign data into ratedValue
        this.rated = ratedValue; // make ratedValue into rated (global)
      }
    )
  }

  btnRate(){
    this.currentRate = this.currentRate + 1;
    this.currentRate = this.currentRate.toString();
    this.rated = this.rated.toString();

    if(this.rated=="Unrated" || this.rated=="No rated"){
      this.rated = "Rated";
      this.afd.list("/overallRates/").set("rate",this.currentRate);
      this.afd.list("/rated/").set("rated",this.rated);

      let alert = this.alertCtrl.create({
      title: 'Mr Green Message',
      message: 'Thank you! I am very happy to heard that!',
      buttons: ['OK']
      });

      alert.present();
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Mr Green Message',
        message: 'Ops! You have already rated this system!',
        buttons: ['OK']
      });

      alert.present();
    }
    this.navCtrl.setRoot(MainPage, {currentRate:this.currentRate});
  }

  btnUnrate(){
    if(this.rated=="Rated"){
      this.currentRate = this.currentRate - 1;
    }
    this.currentRate = this.currentRate.toString();
    if(this.currentRate!=-1 && this.rated=="Rated" || this.rated=="No rated"){
      this.rated = "Unrated";
      this.afd.list("/overallRates/").set("rate",this.currentRate);
      this.afd.list("/rated/").set("rated",this.rated);

      let alert = this.alertCtrl.create({
        title: 'Mr Green Message',
        message: 'Thank you! Please come back anytime!',
        buttons: ['OK']
      });

    alert.present();
    }

    else{
      let alert = this.alertCtrl.create({
        title: 'Mr Green Message',
        message: 'Ops! You have already unrated this system!',
        buttons: ['OK']
      });

      alert.present();
    }
    this.navCtrl.setRoot(MainPage, {currentRate:this.currentRate});
  }

  btnDelete(){
    if(this.rated=="Rated"){
      this.currentRate = this.currentRate - 1;
      this.currentRate = this.currentRate.toString();
      this.rated = "No rated";
      this.afd.list("/overallRates/").set("rate",this.currentRate);
      this.afd.list("/rated/").set("rated",this.rated);

      let alert = this.alertCtrl.create({
        title: 'Mr Green Message',
        message: 'Your rate was deleted!',
        buttons: ['OK']
      });

    alert.present();
    }

    else if(this.rated=="Unrated"){
      this.currentRate = this.currentRate.toString();
      this.rated = "No rated";
      this.afd.list("/overallRates/").set("rate",this.currentRate);
      this.afd.list("/rated/").set("rated",this.rated);

      let alert = this.alertCtrl.create({
        title: 'Mr Green Message',
        message: 'Your rate was deleted!',
        buttons: ['OK']
      });

    alert.present();
    }
  }

  backMain(){
    this.navCtrl.setRoot(MainPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvaluationPage');
  }

}
