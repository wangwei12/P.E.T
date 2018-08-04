import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import $ from 'jquery'
/**
 * Generated class for the CarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car',
  templateUrl: 'car.html',
})
export class CarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

  }
  price: number;
  num: number;
  total = 0;
  s = 0;
  g = 0;
  idarr = [];
  settotal(m) {
    this.s = this.shop[m].price * this.shop[m].num
    this.total += this.s
  }
  shop
  ionViewWillEnter() {
    if ($('.che2').prop("checked")) {
      $('.che').prop("checked", true)
    };
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
          that.shop = result
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:8089?" + obj.username, true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send()
  }
  next(m, e) {
    //console.log($(e.currentTarget).parent().parent().prev().children().prop("checked"))
    this.shop[m].num--;
    if ($(e.currentTarget).parent().parent().prev().children().prop("checked") && this.shop[m].num >= 1) {
      this.total -= this.shop[m].price
    }
    else if ($(e.currentTarget).parent().parent().prev().children().prop("checked") && this.shop[m].num < 1) {
      this.shop[m].num = 1;
      return;
    }
    else if (!$(e.currentTarget).parent().parent().prev().children().prop("checked") && this.shop[m].num < 1) {
      this.shop[m].num = 1
    }
  }
  add(m, e) {
    this.shop[m].num++;
    if ($(e.currentTarget).parent().parent().prev().children().prop("checked")) {
      this.total += this.shop[m].price
    }
  }
  sum(m, e) {
    if ($(e.currentTarget).prop("checked")) {
      this.settotal(m);
      this.idarr.push(this.shop[m]);
    }
    else {
      this.total = this.total - this.shop[m].price * this.shop[m].num;
      $('.che2').prop('checked', false);
      this.idarr.splice($.inArray('m', this.idarr))
    }
    var allLength = $("input[class=che]").length;
    var selectedLength = $("input[class=che]:checked").length
    if (selectedLength == allLength && selectedLength != 0) {
      $('.che2').prop("checked", true);//全选按钮
    } else {
      $('.che2').prop("checked", false);
    }
  }
  all() {
    if ($('.che2').prop("checked")) {
      $('.che').prop("checked", true)

      for (var m = 0; m < this.shop.length; m++) {
        this.settotal(m)
        this.idarr.push(this.shop[m]);
      }
    } else {
      $('.che').prop("checked", false)
      this.s = 0;
      this.total = 0;
    }
  }
  gobuy2() {
    this.navCtrl.push('SubmitPage', { idarr: this.idarr });
  }
  remove(m, e) {
    $(e.currentTarget).parents('ion-item').remove();
    if ($(e.currentTarget).parent().parent().prev().children().prop("checked")) {
      this.total = this.total - this.shop[m].price * this.shop[m].num;
    }
    var that = this
    var obj = {
      'username': localStorage.getItem('username'),
      'id': this.shop[m].id,
      'name': this.shop[m].name
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      // console.log(xhr.readyState, xhr.status);
      if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          that.shop.splice(m, m + 1);
          if ($("input[class=che]:checked").length == 0) {
            $('.che2').prop('checked', false)
          }

        }
      }
    };
    xhr.open("post", "http://127.0.0.1:8088?username=" + obj.username + "&id=" + obj.id + "&name=" + obj.name, true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send();
  }

}

