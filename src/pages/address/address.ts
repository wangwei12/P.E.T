import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  address=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  obj={username:window.localStorage.getItem('username')}
  ionViewWillEnter() {
    var that = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      // console.log(xhr.readyState, xhr.status);
      if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          that.address=result;
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:7000?addresslist"+','+this.obj.username, true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send()
  }
   gonew(){
     this.navCtrl.push('NewaddPage')
   }
   deleadd(i){
    var that = this;
    var obj={username:window.localStorage.getItem('username'),id:i}
    var that = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      // console.log(xhr.readyState, xhr.status);
      if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          that.address.splice(i,i+1);
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:8099?username="+obj.username+'&id='+obj.id, true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send()
   }
   revise(i){
     this.navCtrl.push('ReviseaddPage',{'curadd':this.address,'id':i})
   }
}

