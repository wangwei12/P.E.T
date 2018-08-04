import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ToastController, App, Tabs } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import $ from 'jquery';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  txt = 'goods'
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public platform: Platform,
    public appCtrl: App, public toastCtrl: ToastController) {

  }
  qrscan() {
    this.navCtrl.push('ScanPage');
  }
  gol() {
    this.modalCtrl.create('LocationPage').present();
  }
  go1() {
    this.navCtrl.push('XiangqinPage')
  }
  go2() {
    this.navCtrl.push('ChongwuzhaolingPage')
  }
  go3() {
    this.navCtrl.push('ZhaolingPage')
  }
  shoparr = [];
  shop
  ionViewDidLoad() {
    var that = this
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      // console.log(xhr.readyState, xhr.status);
      if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          that.shop = result
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:8090?toylist", true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send();
  }
  goshop1(i) {
    this.shoparr = [];
    this.shoparr.push(this.shop[i.id]);
    this.navCtrl.push('Shop1Page', {
      shoparr: this.shoparr,
      id: i.id,
      list: 'toy',
      name:i.name
    })
  }
}
