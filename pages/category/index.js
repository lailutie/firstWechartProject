import { request } from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: null
  },
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 数据缓存
    const Cates = wx.getStorageSync("cates")
    if(!Cates) {
      this.getCates()
    }else {
      // 如果超时重新请求数据
      if(Date.now()-Cates.time > 1000*10) {
        this.getCates()
      }else {
        this.Cates = Cates.data
        // 左侧数据
        let leftMenuList = this.Cates.map(v => v.cat_name)
        // 右侧数据
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  getCates() {
    request({url : "/categories"}).then(
      res => {
        // console.log(res)
        // 全部的数据
        this.Cates = res.data.message
        // 将接口数据缓存
        wx.setStorageSync("cates", {time: Date.now(), data: this.Cates})
        // 左侧数据
        let leftMenuList = this.Cates.map(v => v.cat_name)
        // 右侧数据
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    )
  },
  // 左侧点击事件
  handleItemTap(e) {
    console.log(e)
    let { index } = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
})