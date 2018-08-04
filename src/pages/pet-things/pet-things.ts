import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PetThingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pet-things',
  templateUrl: 'pet-things.html',
})
export class PetThingsPage {
  itemArr = []
  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    var that = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      //		console.log(xhr.readyState,xhr.status);
      if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          that.itemArr = result;
        }
      }
    };
    xhr.open("get", "http://127.0.0.1:8083?thingslist ", true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send();
  }
  change() {
    this.itemArr.unshift(this.itemArr.pop());
  }

}
