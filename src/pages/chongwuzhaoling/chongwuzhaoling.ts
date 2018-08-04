import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import $ from 'jquery'
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ChongwuzhaolingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chongwuzhaoling',
  templateUrl: 'chongwuzhaoling.html',
})
export class ChongwuzhaolingPage {
  url: any;
  avatarPath = './assets/imgs/goutou.png';//默认图片  
  data: string = "";
  imageBase64: Array<string> = [];
  title = '招领信息'
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private imagePicker: ImagePicker,
    private base64: Base64,
    public toastCtrl: ToastController
  ) {
    if (this.navParams.get('title')) {
      this.title = this.navParams.get('title');
    }
  }

  toppings;
  years;
  year;
  name;
  sex;
  img;
  phone = $('.text').val();
  text;

  fabu() {
    if ($('.text').val() == '' || this.toppings == '' || this.name == '' || this.years == '') {
      let toast = this.toastCtrl.create({
        message: '请完善信息',
        position: 'middle',
        duration: 2000
      });
      toast.present();
    } else {
      
      var obj = {
        'name': this.name,
        'years': this.years,
        'sex': this.toppings,
        'img': 'http://img.lelezone.com/thumb/w/201705/41/51/41513776361eb0287313a57a6709de2c,c_fill,h_320,w_480.jpg',
        'text': $('.text1').val(),
        'phone': $('.text').val(),
        'list':null
      }
      if(this.title == '相亲信息'){
        obj.list = 'petlist'
      }else{
        obj.list = 'adoptlist'
      }
      console.log(obj)
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        // console.log(xhr.readyState, xhr.status);
        if (xhr.readyState == 4) {
          //表示服务器的相应代码是200；正确返回了数据
          if (xhr.status == 200) {

          }
        }
      };
      xhr.open("post", "http://127.0.0.1:8092", true);//使用POST方法
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
      xhr.send(JSON.stringify(obj));
      let toast = this.toastCtrl.create({
        message: '信息发布成功',
        position: 'middle',
        duration: 2000
      });
      toast.present();
    }
  }
  getPicture() {
    this.data = "";
    this.imageBase64 = [];

    let options = {
      maximumImagesCount: 5,
      outputType: 1,
      quality: 100
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        // 保存图片到html控件  
        var imgUrl = "<img src=" + results[i] + " width=\"60px\" height=\"60px\">  ";
        this.data = this.data + imgUrl;
        // 转64字节  
        this.base64.encodeFile(results[i]).then((base64File: string) => {
          this.imageBase64.push(base64File);
        }, (err) => {
          console.log(err);
        });
      }
    }, (err) => {
      alert("error");
    });
  }
}

