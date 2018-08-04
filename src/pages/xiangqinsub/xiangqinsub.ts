import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the XiangqinsubPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xiangqinsub',
  templateUrl: 'xiangqinsub.html',
})
export class XiangqinsubPage {
  id: number;
  petcontent = [];
  petdetail = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get('id');

  }

  ionViewWillEnter() {
    var obj = {
      id: this.id
    }
    var that = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      // console.log(xhr.readyState, xhr.status);
      if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          that.petcontent = result[0];
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:8091?petlist" + "," + obj.id, true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send()
  }

}
