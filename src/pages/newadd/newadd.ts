import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AddressPage} from '../address/address'
/**
 * Generated class for the NewaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newadd',
  templateUrl: 'newadd.html',
})
export class NewaddPage {
  obj={name:'',phone:'',address:'',username:''};
  name='';
  phone='';
  address='';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   
  }
  save(){
    this.obj.name=this.name;
    this.obj.phone=this.phone;
    this.obj.address=this.address;
    this.obj.username=window.localStorage.getItem('username');
    var that = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      // console.log(xhr.readyState, xhr.status);
      if (xhr.readyState == 4) {
        //表示服务器的相应代码是200；正确返回了数据
        if (xhr.status == 200) {
          var message = xhr.responseText;
          var result = JSON.parse(message);
          if(result == 1){
            that.navCtrl.pop();
          }else{
            alert('添加错误!');
          }
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:8095?address="+this.obj.address+'&phone='+this.obj.phone+'&name='+this.obj.name+'&username='+this.obj.username, true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send()
  }

}
