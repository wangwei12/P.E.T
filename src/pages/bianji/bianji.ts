import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-bianji',
  templateUrl: 'bianji.html',
})
export class BianjiPage {
  item = [];
  username: any;
  me: any;
  sex: any;
  birthDay: any;
  zhiye: any;
  school: any;
  city: any;
  home: any;
  email: any;
  text: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController) {
  }

  ionViewWillEnter() {
    var that = this;
    var obj = {
      'user': localStorage.getItem('username')
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      // console.log(xhr.readyState,xhr.status);
      if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          if (result[0]) {
            that.item = result[0];
          }
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:8094?" + obj.user, true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send();
  }
  sub() {
    var that = this;
    //创建http服务
    var obj = {
      'user': localStorage.getItem('username'),
      'username': this.username,
      'me': this.me,
      'sex': this.sex,
      'birthDay': this.birthDay,
      'zhiye': this.zhiye,
      'school': this.school,
      'city': this.city,
      'home': this.home,
      'email': this.email,
      'text': this.text
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      // console.log(xhr.readyState,xhr.status);
      if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          if (result == 1) {
            let toast = that.toastCtrl.create({
              message: '更新资料成功',
              position: 'middle',
              duration: 2000
            });
            toast.present();
          }
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:8093?username=" + obj.username + '&user=' + obj.user + '&me=' + obj.me + '&sex=' + obj.sex + '&birthDay=' + obj.birthDay + '&zhiye=' + obj.zhiye + '&school=' + obj.school + '&city=' + obj.city + '&home=' + obj.home + '&email=' + obj.email + '&text=' + obj.text, true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send();

  }

}
