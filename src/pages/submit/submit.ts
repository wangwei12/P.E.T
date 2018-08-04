import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'page-submit',
  templateUrl: 'submit.html',
})
export class SubmitPage {
  idarr;
  num = 0;
  check = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController, public viewCtrl: ViewController) {
    this.idarr = this.navParams.get('idarr');
    for (var i = 0; i < this.idarr.length; i++) {
      this.num += this.idarr[i].price * this.idarr[i].num
    }
  }
  number = this.idarr;
  id;
  u = localStorage.getItem('username');
  loc = '河北省石家庄市河北师范大学（新校区）';
  fangfa = '请选择';
  goback1() {
    this.viewCtrl.dismiss();
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择配送方式',
      buttons: [
        {
          text: '快递免邮',
          handler: () => {
            this.fangfa = '快递免邮';
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            this.fangfa = '到货自付';
          }
        }
      ]
    });

    actionSheet.present();
  }
  gosubmit() {
    this.navCtrl.push('BuyPage');
  }
  checked() {
    this.check = !this.check;
  }
}
