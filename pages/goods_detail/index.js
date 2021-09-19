
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  // 商品对象
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
  },
  getGoodsDetail(goods_id) {
    request({url : "/goods/detail", data: {goods_id}}).then(
      res => {
        // console.log(res)
        this.setData({
          goodsObj: {
            goods_name: res.data.message.goods_name,
            goods_price: res.data.message.goods_price,
            // iphone部分手机 不识别 webp图片格式 
            // 最好找到后台 让他进行修改 
            // 临时自己改 确保后台存在 1.webp => 1.jpg 
            goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
            pics: res.data.message.pics
          }
        })
        // 将需要展示的信息保存在全局
        this.GoodsInfo = res.data.message
      }
    )
  },
    // 点击轮播图 放大预览
    handlePrevewImage(e) {
      // 1 先构造要预览的图片数组 
      const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
      // 2 接收传递过来的图片url
      const current = e.currentTarget.dataset.url;
      wx.previewImage({
        current,
        urls
      });
  
    },
      // 点击 加入购物车
  handleCartAdd() {
    // 1 获取缓存中的购物车 数组
    let cart = wx.getStorageSync("cart") || [];
    // 2 判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      //3  不存在 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      // 4 已经存在购物车数据 执行 num++
      cart[index].num++;
    }
    // 5 把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    // 6 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户 手抖 疯狂点击按钮 
      mask: true
    });
  },
})