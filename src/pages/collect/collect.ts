import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-collect',
  templateUrl: 'collect.html',
})
export class CollectPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  arr;

  ionViewWillEnter() {
    var that = this;
    var obj = {
      'username': localStorage.getItem('username')
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          that.arr = result
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:7000?collectlist" + ',' + obj.username, true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send()

  }

  no(l, e) {
    var that = this;
    var obj = {
      'username': localStorage.getItem('username'),
      'name': this.arr[l].name
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          that.arr.splice(l, l + 1)
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:8098?username=" + obj.username + '&name=' + obj.name, true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send()
  }

}
