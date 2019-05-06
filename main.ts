import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, AlertController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ResultPage } from '../result/result';
import { InteractionPage } from '../interaction/interaction';
import { EvaluationPage } from '../evaluation/evaluation';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  arrName;
  rate;
  humids;

  myName: string;
  currentRate;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private fdb: AngularFireDatabase) {
      this.rate = fdb.list("/rate/").valueChanges();
      this.myName = this.navParams.get('myName');     // Show data in page
      this.getRate();
      //this.getName();
      //console.log(this.myName, this.rate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  //getName(){
    //this.afd.list('/myNames/').valueChanges().subscribe(
      //data =>{
        //console.log(data)
        //this.myName = data;
      //}
    //)
  //}

  checkPlantCondition(){
    this.navCtrl.push(ResultPage);
    const loading = this.loadCtrl.create({
      content: 'Loading... *Takes longer to load with slower WiFi speed*',
      duration: 5000
    });
    loading.present();
  }

  makeInteraction(){
    this.navCtrl.push(InteractionPage);
    const loading = this.loadCtrl.create({
      content: 'Loading...',
      duration: 5000
    });
    loading.present();
  }

  evaluate() {
    let release = this.modalCtrl.create(EvaluationPage);
    release.present();
  }

  getRate(){
    this.fdb.list('/overallRates/').valueChanges().subscribe( // DHT11 selected firebase
      data =>{
        console.log(data)
        var numRate = +data;   //Change to number *IMPORTANT
        this.currentRate = numRate; // Affect the result *IMPORTANT
      }
    )
  }
}
