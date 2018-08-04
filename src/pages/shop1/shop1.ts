import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import $ from 'jquery'

/**
 * Generated class for the Shop1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop1',
  templateUrl: 'shop1.html',
})
export class Shop1Page {
  pet: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public modalCtel: ModalController,
    public viewCtrl: ViewController) {
    this.shoparr = this.navParams.get('shoparr');
    this.name = this.navParams.get('name')
    this.pet = this.navParams.get('list');
    this.number2 = this.shoparr[0].num;
    this.num2 = this.shoparr[0].price;
    this.num3 = this.shoparr[0].price;
    this.id = this.navParams.get('id');
  }
  shoparr = []
  id;
  name;
  classname;
  idarr = [];
  number = 1;
  number2;
  num2;
  num3;
  star = 'star1';
  collect = '收藏';

  ionViewWillEnter() {
    var that = this;
    var obj = {
      'username': localStorage.getItem('username')
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          for (var i = 0; i < result.length; i++) {
            if (result[i].name == that.name) {
              that.star = 'star';
              that.collect = '已收藏'
            }
          }
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:7000?collectlist" + ',' + obj.username, true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send()

  }
  GoCar() {
    this.navCtrl.push('CarPage')
  }
  next() {
    this.number--;
    this.num2 -= this.shoparr[0].price
    if (this.number < 1) {
      this.number = 1;
      this.num2 = this.shoparr[0].price
    }
  }
  add() {
    this.number++;
    this.num2 += this.shoparr[0].price
  }
  next2() {
    this.shoparr[0].num--;
    this.number2--;
    this.num3 -= this.shoparr[0].price
    if (this.number2 < 1) {
      this.number2 = 1;
      this.shoparr[0].num = 1;
      this.num3 = this.shoparr[0].price
    }
  }
  add2() {
    this.shoparr[0].num++;
    this.number2++;
    this.num3 += this.shoparr[0].price
  }
  buy() {
    $('.tan2').css('display', 'block')
    $('.tan3').animate({
      height: '350px',
    });
  }
  gocar2() {
    this.idarr = [];
    this.idarr.push(this.shoparr[0])
    this.navCtrl.push('SubmitPage', {
      idarr: this.idarr,
    });
  }
  gobuy() {
    $('.tan2').css('display', 'block')
    $('.tan').animate({
      height: '350px',
    });
  }
  close(){
    $('.tan').animate({
      height: '0px',
      bottom: '0px',
    });
  }
  no() {
    if (this.star == 'star1') {

    }
    else {

    }
    var obj = {
      'username': localStorage.getItem('username'),
      'id': this.id,
      'list': this.pet
    }
    var that = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      console.log(xhr.readyState, xhr.status);
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          if (result == 1) {
            that.star = 'star';
            that.collect = '已收藏'
            console.log('success')
          }
          else if (result == 0) {
            var obj2 = {
              'username': localStorage.getItem('username'),
              'name': that.shoparr[0].name
            }
            var xhr2 = new XMLHttpRequest();
            xhr2.onreadystatechange = function () {
              if (xhr2.readyState == 4) {
                if (xhr2.status == 200) {
                  var message = xhr2.responseText;
                  var result = JSON.parse(message);
                  if (result == 1) {
                    that.star = 'star1';
                    that.collect = '收藏'
                    console.log('已存在')
                  }
                }
              }
            }
            xhr2.open("post", "http://127.0.0.1:8098?username=" + obj2.username + '&name=' + obj2.name, true);//使用POST方法
            xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
            xhr2.send()

          }
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:8097?username=" + obj.username + '&id=' + obj.id + '&list=' + obj.list, true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send();
  }
  no2() {
    $('.tan2').css('display', 'none')
    $('.tan3').animate({
      height: '0px',
      bottom: '0px',
    });
  }
  goback() {
    this.viewCtrl.dismiss();
  }
  gocar() {
    var that = this;
    var obj = {
      'username': localStorage.getItem('username'),
      'id': this.id,
      'num': this.number,
      'list': this.pet,
      'name': this.name
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      // console.log(xhr.readyState, xhr.status);
      if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
          $('.tan2').css('display', 'none')
          $('.tan').animate({
            height: '0px',
            bottom: '0px',
          });
          let toast = that.toastCtrl.create({
            message: '成功加入我的订单',
            position: 'middle',
            duration: 2000
          });
          toast.present();
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:7087?username=" + obj.username + "&id=" + obj.id + "&num=" + obj.num + "&list=" + obj.list + "&name=" + obj.name, true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send();
  }
}
