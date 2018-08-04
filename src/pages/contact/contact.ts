import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  items = []
  constructor(public navCtrl: NavController,
  ) {

  }
  ionViewWillEnter() {
    var that = this;
    //创建http服务
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      //console.log(xhr.readyState,xhr.status);
      if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          if (that.items.length < result.length) {
            for (var i = 0; i < result.length; i++) {
              that.items.push(result[i].class);
            }
          }
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:8083?contextlist", true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send();
  }

  others(index) {
    if (index == 0) {
      this.navCtrl.push('PetThingsPage');
    } else if (index == 1) {
      this.navCtrl.push('JingyanjiaoliuPage');
    } else if (index == 2) {
      this.navCtrl.push('SearchpetPage');
    } else if (index == 3) {
      // this.navCtrl.push('')
    }
  }

}
