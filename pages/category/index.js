// pages/category/index.js
import { request } from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    currentMenuIndex: 0,
    rightScrollTop: 0
  },

  CateList: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 缓存
    const CateList = wx.getStorageSync("cateList");
    if (!CateList) {
      this.getCateList();
    } else if (Date.now() - CateList.time > 1000*60*60 ) {
      this.getCateList();
    } else {
      this.CateList = CateList.data;

      let leftMenuList = CateList.data.map(cate => cate.cat_name);
      let rightContent = CateList.data[0].children;

      this.setData({
        leftMenuList,
        rightContent
      })
    }

  },

  // 获取分类数据
  async getCateList() {
    const result = await request({ url: "/categories" });
    this.CateList = result;

    wx.setStorageSync("cateList", {
      time: Date.now(),
      data: this.CateList
    });
    
    let leftMenuList = this.CateList.map(cate => cate.cat_name);
    let rightContent = this.CateList[0].children;

    this.setData({
      leftMenuList,
      rightContent
    })
  },

  handleItemTap(e) {
    const { index } = e.currentTarget.dataset;
    let rightContent = this.CateList[index].children;

    this.setData({
      currentMenuIndex: index,
      rightContent,
      rightScrollTop: 0
    });
  }
})