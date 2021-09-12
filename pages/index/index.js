import { request } from "../../request/index"

//Page Object
Page({
  data: {
    swiperList : [],
    cateList : [],
    floorList : []
  },
  //options(Object)
  onLoad: function(options) {
    this.getSwiperList()
    this.getCateList()
    this.getfloorList()
  },
  getSwiperList() {
        // 轮播图数据  这中方法可能会造成回调地狱
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     // console.log(result)
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //     // console.log(this.data.swiperList)
    //   }
    // });

    request({ url : "/home/swiperdata" }).then(
      result => {
        this.setData({
          swiperList: result.data.message
        })
      }
    )
  },
  getCateList() {
    request({ url : "/home/catitems"}).then(
      result => {
        this.setData({
          cateList : result.data.message
        })
      }
    )
  },
  getfloorList() {
    request({ url : "/home/floordata" }).then(
      result => {
        this.setData({
          floorList : result.data.message
        })
      }
    )
  }
});
  