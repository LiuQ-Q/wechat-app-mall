// pages/goods_detail/index.js
import { request } from "../../request/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

  // 商品对象
  goodsInfo: {},

  // 生命周期函数--监听页面加载

  onLoad: function (options) {
    this.getGoodsDetail(options.goods_id);
  },

  // 获取商品详情数据
  getGoodsDetail (goods_id) {
    request({url: '/goods/detail', data: {goods_id}}).then((res) => {
      this.goodsInfo = res;
      this.setData({
        goodsObj: {
          goods_name: res.goods_name,
          goods_price: res.goods_price,
          goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
          pics: res.pics
        }
      })
    })
  },
  // 点击放大预览轮播图
  handlePreviewImg (e) {
    const urls = this.goodsInfo.pics.map(item => item.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  }
})
