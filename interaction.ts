import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../main/main';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the InteractionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-interaction',
  templateUrl: 'interaction.html',
})
export class InteractionPage {

  humids; // Firebase data
  temps;
  soils;
  lights;

  selectedHobbies:String = ""; // Drop down values
  selectedFoods:String = "";
  selectedAmbs:String = "";
  selectedCartoons:String = "";
  selectedDislikes:String = "";
  selectedBest:String = "";
  selectedWorst:String = "";

  greet = true; // Interaction starter

  plantGood = false; // good interaction
  plantBad = false; // bad interaction

  hobby = false;  // good interaction variables
  happy = false;
  sad = false;
  food = false;
  amb = false;
  likes = false;
  dislikes = false;

  prob = false; // bad interaction variables

  drySoil1 = false; // problems 1
  moisSoil1 = false;
  tempHeat1 = false;
  tempCold1 = false;
  lowHumid1 = false; 
  highHumid1 = false;
  dark1 = false;
  bright1 = false;

  drySoil2 = false; // problems 2
  moisSoil2 = false;
  tempHeat2 = false;
  tempCold2 = false;
  lowHumid2 = false; 
  highHumid2 = false;
  dark2 = false;
  bright2 = false;

  tooDry1 = false; // huge problems 1
  tooMois1 = false;
  tooHeat1 = false;
  tooCold1 = false;
  tooLow1 = false;
  tooHigh1 = false;
  tooDark1 = false;
  tooBright1 = false;

  tooDry2 = false; // huge problems 2
  tooMois2 = false;
  tooHeat2 = false;
  tooCold2 = false;
  tooLow2 = false;
  tooHigh2 = false;
  tooDark2 = false;
  tooBright2 = false;

  last = false; // End the interaction

  goodRandom;
  soilRandom;
  humidRandom;
  tempRandom;
  lightRandom;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabase) {
    this.getHumid();
    this.getTemp();
    this.getMois();
    this.getLight();
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

  firstInter(){
    this.greet = !this.greet;
    if(this.humids >= 50 && this.humids <= 60 && 
       this.temps >= 25 && this.temps <= 30 &&
       this.soils >= 40 && this.soils <= 60 &&
       this.lights >= 200 && this.lights <= 600)
      this.plantGood = !this.plantGood;
    else if(this.humids < 50 || this.humids > 60 ||
            this.temps < 25 || this.temps > 30 ||
            this.soils < 40 || this.soils > 60 ||
            this.lights < 200 || this.lights > 600)
      this.plantBad = !this.plantBad;
  }

  myInter(){
    var max = 4;
    var min = 1;
    this.goodRandom = Math.floor(Math.random() * (max-min) + min);
    this.plantGood = !this.plantGood;
    if(this.goodRandom==1){
      this.hobby = !this.hobby;
    }
    else if(this.goodRandom==2){
      this.likes = !this.likes;
    }
    else if(this.goodRandom>=3){
      this.happy = !this.happy;
    }
  }

  hobbies(event:any){
    this.selectedHobbies = event.target.value;
  }

  foods(event:any){
    this.selectedFoods = event.target.value;
  }

  ambs(event:any){
    this.selectedAmbs = event.target.value;
  }

  cartoons(event:any){
    this.selectedCartoons = event.target.value;
  }

  dislikeThings(event:any){
    this.selectedDislikes = event.target.value;
  }

  bestMoment(event:any){
    this.selectedBest = event.target.value;
  }

  worstMoment(event:any){
    this.selectedWorst = event.target.value;
  }

  secondInter(){
    this.hobby = !this.hobby;
    this.food = !this.food;
  }

  thirdInter(){
    this.food = !this.food;
    this.amb = !this.amb;
  }

  forthInter(){
    this.amb = !this.amb;
    this.last = !this.last;
  }

  likingInter(){
    this.likes = !this.likes;
    this.dislikes = !this.dislikes;
  }

  dislikingInter(){
    this.dislikes = !this.dislikes;
    this.last = !this.last;
  }

  happyInter(){
    this.happy = !this.happy;
    this.sad = !this.sad;
  }

  sadInter(){
    this.sad = !this.sad;
    this.last = !this.last;
  }

  endInter(){
    this.last = !this.last;
    this.greet = !this.greet;
    this.navCtrl.setRoot(MainPage);
  }

  badPhase(){
    var max = 3;
    var min = 1;
    this.soilRandom = Math.floor(Math.random() * (max-min) + min);
    this.tempRandom = Math.floor(Math.random() * (max-min) + min);
    this.humidRandom = Math.floor(Math.random() * (max-min) + min);
    this.lightRandom = Math.floor(Math.random() * (max-min) + min);
    this.plantBad = !this.plantBad;
    this.prob = !this.prob;

    if(this.soils < 40 && this.soils >= 30){
      if(this.soilRandom==1)
        this.moisSoil1 = !this.moisSoil1;
      else if(this.soilRandom>=2)
        this.moisSoil2 = !this.moisSoil2;
    }
    else if(this.soils > 60 && this.soils <= 80){
      if(this.soilRandom==1)
        this.drySoil1 = !this.drySoil1;
      else if(this.soilRandom>=2)
        this.drySoil2 = !this.drySoil2;
    }
    if(this.temps < 25 && this.temps >= 20){
      if(this.tempRandom==1)
        this.tempCold1 = !this.tempCold1;
      else if(this.tempRandom>=2)
        this.tempCold2 = !this.tempCold2;
    }
    else if(this.temps > 30 && this.temps <= 35){
      if(this.tempRandom==1)
        this.tempHeat1 = !this.tempHeat1;
      else if(this.tempRandom>=2)
        this.tempHeat2 = !this.tempHeat2;
    }
    if(this.humids < 50 && this.humids >= 40){
      if(this.humidRandom==1)
        this.lowHumid1 = !this.lowHumid1;
      else if(this.humidRandom>=2)
        this.lowHumid2 = !this.lowHumid2;
    }
    else if(this.humids > 60 && this.humids <= 70){
      if(this.humidRandom==1)
        this.highHumid1 = !this.highHumid1;
      else if(this.humidRandom>=2)
        this.highHumid2 = !this.highHumid2;
    }
    if(this.lights < 200 && this.lights >= 150){
      if(this.lightRandom==1)
        this.bright1 = !this.bright1;
      else if(this.lightRandom>=2)
        this.bright2 = !this.bright2;
    }
    else if(this.lights > 600 && this.lights <=800){
      if(this.lightRandom==1)
        this.dark1 = !this.dark1;
      else if(this.lightRandom>=2)
        this.dark2 = !this.dark2;
    }

    if(this.soils < 30){
      if(this.soilRandom==1)
        this.tooMois1 = !this.tooMois1;
      else if(this.soilRandom>=2)
        this.tooMois2 = !this.tooMois2;
    }
    else if(this.soils > 80){
      if(this.soilRandom==1)
        this.tooDry1 = !this.tooDry1;
      else if(this.soilRandom>=2)
        this.tooDry2 = !this.tooDry2;
    }
    if(this.temps < 20){
      if(this.tempRandom==1)
        this.tooCold1 = !this.tooCold1;
      else if(this.tempRandom>=2)
        this.tooCold2 = !this.tooCold2;
    }
    else if(this.temps > 35){
      if(this.tempRandom==1)
        this.tooHeat1 = !this.tooHeat1;
      else if(this.tempRandom>=2)
        this.tooHeat2 = !this.tooHeat2;
    }
    if(this.humids < 40){
      if(this.humidRandom==1)
        this.tooLow1 = !this.tooLow1;
      else if(this.humidRandom>=2)
        this.tooLow2 = !this.tooLow2;
    }
    else if(this.humids > 70){
      if(this.humidRandom==1)
        this.tooHigh1 = !this.tooHigh1;
      else if(this.humidRandom>=2)
        this.tooHigh2 = !this.tooHigh2;
    }
    if(this.lights < 150){
      if(this.lightRandom==1)
        this.tooBright1 = !this.tooBright1;
      else if(this.lightRandom>=2)
        this.tooBright2 = !this.tooBright2;
    }
    else if(this.lights > 800){
      if(this.lightRandom==1)
        this.tooDark1 = !this.tooDark1;
      else if(this.lightRandom>=2)
        this.tooDark1 = !this.tooDark1;
    }
  }

  probInter(){
    this.prob = !this.prob;

    this.drySoil1 = false;
    this.moisSoil1 = false;
    this.tempHeat1 = false;
    this.tempCold1 = false;
    this.lowHumid1 = false;
    this.highHumid1 = false;
    this.dark1 = false;
    this.bright1 = false;

    this.drySoil2 = false;
    this.moisSoil2 = false;
    this.tempHeat2 = false;
    this.tempCold2 = false;
    this.lowHumid2 = false;
    this.highHumid2 = false;
    this.dark2 = false;
    this.bright2 = false;

    this.tooDry1 = false;
    this.tooMois1 = false;
    this.tooHeat1 = false;
    this.tooCold1 = false;
    this.tooLow1 = false;
    this.tooHigh1 = false;
    this.tooDark1 = false;
    this.tooBright1 = false;

    this.tooDry2 = false;
    this.tooMois2 = false;
    this.tooHeat2 = false;
    this.tooCold2 = false;
    this.tooLow2 = false;
    this.tooHigh2 = false;
    this.tooDark2 = false;
    this.tooBright2 = false;

    this.last = !this.last;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InteractionPage');
  }

}
