import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-repass',
  templateUrl: 'repass.html',
})
export class RepassPage {
  username: any;
  psw: any;
  psw2: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController) {
  }

  sub() {
    var that = this;
    var obj = {
      'username': this.username,
      'NewPassword': this.psw
    }
    //创建http服务
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      //console.log(xhr.readyState,xhr.status);
      if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          if (that.psw == that.psw2) {
            if (result == 1) {
              that.navCtrl.pop();
            }
          } else {
            let toast = that.toastCtrl.create({
              message: '密码不一致',
              position: 'middle',
              duration: 2000
            });
            toast.present();
          }
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:8085?" + obj.NewPassword + "," + obj.username, true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send();
  }

}
