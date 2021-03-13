// pages/goods_list/index.js
import { request } from "../../request/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 0,
        value: "价格",
        isActive: false
      }
    ],
    goodList: []
  },

  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },

  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodList();

    wx.showLoading({
      title: '加载中',
    })
    
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    
  },

  async getGoodList() {
    const res = await request({url:"/goods/search", data: this.QueryParams});
    const total = res.total;

    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    this.setData({
      goodList: [...this.data.goodList, ...res.goods]
    });

    // 关闭下拉刷新框
    wx.stopPullDownRefresh();
  },

  tabsItemChange(e) {
    const index = e.detail;
    let { tabs } = this.data;
    
    tabs.forEach((tab, tabIndex) => {
      tabIndex === index ? tab.isActive = true : tab.isActive = false;
    });

    this.setData({
      tabs
    })
  },

  // 触底加载
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '全部加载完成了!'
      });
      
    } else {
      // console.log('you');
      this.QueryParams.pagenum++;
      this.getGoodList();
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      goodList: []
    });
    this.QueryParams.pagenum = 1;
    this.getGoodList();
  }
})