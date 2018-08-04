import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import $ from 'jquery'
/**
 * Generated class for the XiangqinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-xiangqin',
  templateUrl: 'xiangqin.html',
})
export class XiangqinPage {
  items = ['雄性', '雌性'];
  province = ["狗", "猫", "宠物鼠", "宠物兔", "宠物鸟", "乌龟", "猴子", "貂", "狐狸", "宠物猪", "其它"]

  citys = [
    //狗分类
    ["阿拉斯加", "哈士奇", "泰迪", "比熊犬", "蝴蝶犬", "拉布拉多", "金毛", "萨摩耶", "吉娃娃", "牧羊犬", "黑背", "贵宾犬", "柯基犬", "柴犬"],
    //猫分类
    ["苏格兰折耳猫", "波斯猫", "布偶猫", "美国短毛猫", "暹罗猫", "狸花猫", "英国短毛猫", "金吉拉猫", "安哥拉猫", "挪威森林猫"],
    //宠物鼠分类
    ["天竺鼠", "毛丝鼠", "金丝熊", "布丁鼠", "奶茶仓鼠", "银狐仓鼠", "老婆婆", "长尾仓鼠", "三线仓鼠", "坎贝尔侏儒仓鼠", "藏仓鼠", "加卡利亚", "黑线仓鼠"],
    //宠物兔分类
    ["公主兔", "荷兰侏儒兔", "迷你垂耳兔", "荷兰垂耳兔", "荷兰兔", "巨型安哥拉兔", "法国垂耳兔", "海棠兔", "巨型花明兔", "波兰兔", "多瓦夫兔", "英国安哥拉兔", "雷克斯兔", "大耳白兔", "忌廉兔", "喜马拉雅兔", "银狐兔", "北极兔", "公羊兔", "雪兔", "香槟兔", "云南花兔"],
    //宠物鸟分类
    ["百灵鸟", "虎皮鹦鹉", "小葵花凤头鹦鹉", "太平鸟", "相思鸟", "八哥鸟", "绯胸鹦鹉", "七彩文鸟", "红嘴蓝鹊", "鸡尾鹦鹉", "蓝点颜"],
    //乌龟分类
    ["巴西红耳龟", "中华草龟", "中华花龟", "枯叶龟", "黄斑地图龟", "亚洲巨龟", "豹纹陆龟", "饼干龟", "加拉帕戈斯象龟", "印度星龟", "蛛网龟"],
    //猴子分类
    ["日本袖珍石猴", "金丝猴", "猕猴", "狐猴", "狨猴", "白面僧帽猴", "指猴"],
    //貂分类
    ["貂", "雪貂", "蒙眼貂", "东方色貂", "火焰色貂", "香槟色貂", "黑眼雪貂", "红眼雪貂"],
    //狐狸分类
    ["雪狐", "银狐", "藏狐", "沙狐", "大耳狐", "孟加拉狐", "赤狐", "苍狐", "蓝狐"],
    //宠物猪分类
    ["小香猪", "越南大肚猪", "胡利亚尼猪", "麝香猪", "香猪"],
    //其它宠物
    ["马", "大象"]
  ];

  city = []
  vips = ['1-5岁', '6-9岁']
  petcontent = []
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

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
          if (that.petcontent.length < result.length) {
            that.petcontent = result;
          }
        }
      }
    };
    xhr.open("post", "http://127.0.0.1:8091?petlist", true);//使用POST方法
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//POST需增加
    xhr.send()
  }
  goFabu() {
    this.navCtrl.push('ChongwuzhaolingPage', {
      title: '相亲信息'
    })
  }
  icon = 'arrowd';
  icon2 = 'arrowd';
  icon3 = 'arrowd';
  L = false;
  G = false;
  H = false
  fuwu() {
    if (this.L == false) {
      $('.serve').css('color', '#dc6d65')
      $('.fuwu').css('color', '#dc6d65')
      $('.city').css('color', 'black')
      $('.diqu').css('color', 'black')
      $('.leavl').css('color', 'black');
      $('.dengji').css('color', 'black');
      $('.servelist').css('display', 'block');
      $('.s1').css('display', 'none');
      $('.servelist2').css('display', 'none');
      this.L = !this.L;
      this.G = false;
      this.H = false;
      this.icon = 'arrowup'
      this.icon2 = 'arrowd'
      this.icon3 = 'arrowd'
    } else {
      $('.serve').css('color', 'black')
      $('.fuwu').css('color', 'black')
      $('.servelist').css('display', 'none');
      this.L = !this.L;
      this.icon = 'arrowd'
    }
  }
  diqu() {
    if (this.G == false) {
      $('.city').css('color', '#dc6d65')
      $('.diqu').css('color', '#dc6d65')
      $('.serve').css('color', 'black')
      $('.fuwu').css('color', 'black')
      $('.leavl').css('color', 'black');
      $('.dengji').css('color', 'black');
      $('.s1').css('display', 'block');
      $('.servelist').css('display', 'none');
      $('.servelist2').css('display', 'none');
      this.G = !this.G;
      this.L = false;
      this.H = false
      this.icon2 = 'arrowup'
      this.icon = 'arrowd'
      this.icon3 = 'arrowd'
    } else {
      $('.city').css('color', 'black')
      $('.diqu').css('color', 'black')
      $('.s1').css('display', 'none');
      this.G = !this.G;
      this.icon2 = 'arrowd'
    }
  }
  dengji() {
    if (this.H == false) {
      $('.leavl').css('color', '#dc6d65');
      $('.dengji').css('color', '#dc6d65');
      $('.serve').css('color', 'black')
      $('.fuwu').css('color', 'black')
      $('.servelist2').css('display', 'block');
      $('.servelist').css('display', 'none');
      $('.city').css('color', 'black')
      $('.diqu').css('color', 'black')
      $('.s1').css('display', 'none');
      this.H = !this.H;
      this.G = false;
      this.L = false
      this.icon3 = 'arrowup'
      this.icon = 'arrowd'
      this.icon2 = 'arrowd'
    } else {
      $('.leavl').css('color', 'black');
      $('.dengji').css('color', 'black');
      $('.servelist2').css('display', 'none');
      this.H = !this.H;
      this.icon3 = 'arrowd'
    }
  }
  Yes1(e,l) {
    $(e.currentTarget).css('color', '#dc6d65');
    $(e.currentTarget).find('.ser-icon').css('display', 'block');
    $(e.currentTarget).siblings().css('color', 'black');
    $(e.currentTarget).siblings().find('.ser-icon').css('display', 'none')
    for(var i=0;i<this.petcontent.length;i++){
      if(this.petcontent[i].sex !== this.items[l]){
        this.petcontent.splice(i,i+1);
      }
    }
  }
  Yes2(e,l) {
    $(e.currentTarget).css('color', '#dc6d65');
    $(e.currentTarget).find('.ser-icon').css('display', 'block');
    $(e.currentTarget).siblings().css('color', 'black');
    $(e.currentTarget).siblings().find('.ser-icon').css('display', 'none')
    for(var i=0;i<this.petcontent.length;i++){
      if(this.petcontent[i].name !== this.city[l]){
        this.petcontent.splice(i,i+1);
      }
    }
  }
  Yes3(e,l) {
    $(e.currentTarget).css('color', '#dc6d65');
    $(e.currentTarget).find('.ser-icon').css('display', 'block');
    $(e.currentTarget).siblings().css('color', 'black');
    $(e.currentTarget).siblings().find('.ser-icon').css('display', 'none')
    for(var i=0;i<this.petcontent.length;i++){
      if(this.petcontent[i].years >= this.vips[l].substring(0,1) && this.petcontent[i].years <= this.vips[l].substring(2,3)){
        console.log('good')
      }else{
        this.petcontent.splice(i,i+1);
      }
    }
  }
  Choose(i, e) {
    this.city = this.citys[i];
    $(e.currentTarget).css('background-color', 'white');
    $(e.currentTarget).css('color', '#dc6d65');
    $(e.currentTarget).siblings().css('color', 'black');
    $(e.currentTarget).siblings().css('background-color', '#f1f1f1')
  }
  goxiangqinsub(i) {
    this.navCtrl.push('XiangqinsubPage', {
      id: i
    })
  }
}
