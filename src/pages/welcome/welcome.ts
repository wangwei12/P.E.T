import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { App } from 'ionic-angular/components/app/app';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})

export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  ionViewWillEnter() {
    var that = this;
    if (localStorage.getItem('login') == null) {
      let time = setTimeout(function () {
        that.app.getRootNavs()[0].setRoot('WelcomePage');
        localStorage.setItem('login', 'true')
      }, 10000)
    } else if (localStorage.getItem('login') == 'true') {
      that.app.getRootNavs()[0].setRoot('LoginPage');

    }
  }




  @ViewChild(Slides) slides: Slides;

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    if (currentIndex == 4) {
      this.app.getRootNavs()[0].setRoot('LoginPage');
    }
  }
  goHome() {
    this.app.getRootNavs()[0].setRoot('LoginPage');
  }

}
