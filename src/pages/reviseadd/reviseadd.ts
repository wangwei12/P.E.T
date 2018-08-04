import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the ReviseaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reviseadd',
  templateUrl: 'reviseadd.html',
})
export class ReviseaddPage {
  obj={name:'',phone:'',address:'',username:'',id:''};
  name='';
  phone='';
  address='';
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    var id=this.navParams.data.id;
    this.phone=this.navParams.data.curadd[id].phone;
    this.name=this.navParams.data.curadd[id].name;
    this.address=this.navParams.data.curadd[id].address;
   
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '修改成功',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
  saverevise(){
    this.obj.name=this.name;
    this.obj.phone=this.phone;
    this.obj.address=this.address;
    this.obj.username=window.localStorage.getItem('username');
    this.obj.id=this.navParams.data.id;
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
            that.presentConfirm();
          }else{
            alert('添加错误!');
          }
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:8096?address="+this.obj.address+'&phone='+this.obj.phone+'&name='+this.obj.name+'&username='+this.obj.username+'&id='+this.obj.id, true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send()
    
    
  }
}
