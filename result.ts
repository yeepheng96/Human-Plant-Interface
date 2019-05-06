import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { MainPage } from '../main/main';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  humids;
  temps;
  soils;
  lights;

  toggle = false;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public alertCtrl: AlertController,
  public afd: AngularFireDatabase) {
    this.getHumid();
    this.getTemp();
    this.getMois();
    this.getLight();
    //this.humids = this.navParams.get('humidsss'); // Inside parameter doesnt affect the result, not affect shows result from firebase
    //console.log(this.numHumids); // Never affect results
    //console.log(this.humids);
  }

  getHumid(){ // Get value from firebase
    this.afd.list('/DHT11_Humidity/').valueChanges().subscribe( // DHT11 selected firebase
      data =>{
        console.log(data)
        var numHumids = +data;   //Change to number *IMPORTANT
        this.humids = numHumids; // Affect the result *IMPORTANT
      }
    )
  }

  getTemp(){
    this.afd.list('/DHT11_Temperature/').valueChanges().subscribe( // DHT11 selected firebase
      data =>{
        console.log(data)
        var numTemps = +data;   //Change to number *IMPORTANT
        this.temps = numTemps; // Affect the result *IMPORTANT
      }
    )
  }

  getMois(){
    this.afd.list('/Soil_Sensor/').valueChanges().subscribe( // DHT11 selected firebase
      data =>{
        console.log(data)
        var numSoils = +data;   //Change to number *IMPORTANT
        this.soils = numSoils; // Affect the result *IMPORTANT
      }
    )
  }

  getLight(){
    this.afd.list('/Light_Sensor/').valueChanges().subscribe( // DHT11 selected firebase
      data =>{
        console.log(data)
        var numLights = +data;   //Change to number *IMPORTANT
        this.lights = numLights; // Affect the result *IMPORTANT
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }

  backMain(){
    this.navCtrl.setRoot(MainPage);
  }

  dataInfo(){
    let alert = this.alertCtrl.create({
      title: 'Sensors information',
      message: '1. Perfect for plants <ul><li>Humidity: 50~60%</li><li>Temperature: 25~30°C</li><li>Moisture: 40~50%</li><li>Light: 400~600lx</li></ul><br>2. Small problems for plants <ul><li>Humidity: <50 or >60%</li><li>Temperature: <25 or >30°C</li><li>Moisture: <40 or >50%</li><li>Light: <400 or >600lx</li></ul><br>3. Huge problems for plants <ul><li>Humidity: <40 or >70%</li><li>Temperature: <20 or >35°C</li><li>Moisture: <30 or >60%</li><li>Light: <250 or >700lx</li></ul><br>4. Worst for plants <ul><li>Humidity: <30 or >80%</li><li>Temperature: <15 or >40°C</li><li>Moisture: <15 or >65%</li><li>Light: <150 or >850lx</li></ul><br>Humidity:<ul><li>Less than (<) 50% = Dry</li><li>More than (>) 60% = Wet</li></ul><br>Temperature:<ul><li>Less than (<) 25°C = Cold</li><li>More than (>) 30°C = Hot</li></ul><br>Moisture:<ul><li>Less than (<) 40% = Wet soil</li><li>More than (>) 60% = Dry soil</li></ul><br>Light:<ul><li>Less than (<) 400lx = Bright</li><li>More than (>) 600lx = Dark</li></ul>',
      buttons: ['OK']
    });

    alert.present();
  }

  moreInfo(){
    this.toggle = !this.toggle;
  }
}
