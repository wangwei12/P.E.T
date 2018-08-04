import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  }
  pwd;
  username;
  goLogin() {
    this.navCtrl.pop();
  }
  reg() {
    if(this.username.length == 11){
      var that = this;
      var obj = {
        'username': this.username,
        'password': this.pwd
      }

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        // console.log(xhr.readyState, xhr.status);
        if (xhr.readyState == 4) {
          //表示服务器的相应代码是200；正确返回了数据
          if (xhr.status == 200) {
            var message = xhr.responseText;
            var result = JSON.parse(message);
            if (result == 0) {
              let toast = that.toastCtrl.create({
                message: '用户已注册',
                position: 'middle',
                duration: 2000
              });
              toast.present();
            } else {
              that.navCtrl.pop();
            }

          }
        }
      };
      xhr.open("post", "http://127.0.0.1:8084?" + obj.username + "," + obj.password, true);//使用POST方法
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
      xhr.send();
    }else{
      let toast = this.toastCtrl.create({
        message: '请输入正确的手机号',
        position: 'middle',
        duration: 2000
      });
      toast.present();
    }
  }
}
