import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public app: App) {
  }

  ionViewWillEnter(){
    if(localStorage.getItem('username')){
      this.app.getRootNavs()[0].setRoot(TabsPage);
    }
  }
  repass() {
    this.navCtrl.push('RepassPage')
  }
  user;
  psw;
  goRegister() {
    this.navCtrl.push('RegisterPage');
  }
  gomain() {
    var that = this
    var obj = {
      'username': this.user
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      // console.log(xhr.readyState, xhr.status);
      if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          if (result[0]) {
            if (result[0].password == that.psw) {
              localStorage.setItem('username', that.user);
              that.app.getRootNavs()[0].setRoot(TabsPage);
            } else {
              let toast = that.toastCtrl.create({
                message: '密码不正确',
                position: 'middle',
                duration: 2000
              });
              toast.present();
            }
          } else {
            let toast = that.toastCtrl.create({
              message: '用户名不存在',
              position: 'middle',
              duration: 2000
            });
            toast.present();
          }
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:8090?userlist" + "," + obj.username, true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send();
  }
}
