import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mall',
  templateUrl: 'mall.html',
})
export class MallPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }
  pet: string = 'class'

  i;
  shoparr = [];
  goshop1(i) {
    // this.modalCtrl.create('Shop1Page',{
    //   id:i.id,
    //   classname:this.pet
    // })
    this.shoparr = [];
    this.shoparr.push(this.shop[i.id]);
    this.navCtrl.push('Shop1Page', {
      shoparr: this.shoparr,
      id: i.id,
      list: this.pet,
      name:i.name
    })
  }
  //shop=JSON.parse(localStorage.getItem('res'))
  //shop=JSON.parse(this.shop1);
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
    xhr.open("post", "http://127.0.0.1:8090?classlist", true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send()
  }
  f() {
    var that = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      // console.log(xhr.readyState, xhr.status);
      if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          that.shop = result;
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:8090?" + this.pet + "list", true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send()
  }
}
