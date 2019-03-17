import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { NamePage } from '../name/name';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
  private modalCtrl: ModalController) {
  }

  btnName(){
    let release = this.modalCtrl.create(NamePage);
    release.present();
  }
}
