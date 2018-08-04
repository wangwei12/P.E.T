import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App) {
  }


  name = '点点';
  gocollect(){
    this.navCtrl.push('CollectPage')
  }
  gocar() {
    this.navCtrl.push('CarPage');
  }
  goyou(){
    this.navCtrl.push('CouponPage')
  }
  goperson() {
    this.navCtrl.push('PersonPage')
  }
  goaddress(){
    this.navCtrl.push('AddressPage')
  }
  loginOut() {
    localStorage.removeItem('username');
    this.app.getRootNavs()[0].setRoot('LoginPage');
  }

}
