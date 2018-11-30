// pages/my/setup/setup.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1,
      //是否显示左上角图标
      title: '我的主页',
      //导航栏 中间的标题
       }, 
      // 此页面 页面内容距最顶部的距离 
    height: app.globalData.navHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  // 分享
  showfx: function () {
    this.setData({ show_fenxiang: true })
  },

  showfxqx: function () {
    this.setData({ show_fenxiang: false })
  },



  gerxxTop:function(){
    wx.navigateTo({
      url: './information/information',
    })
  },

  dzTop:function(){
    wx.navigateTo({
      url: './mypraise/mypraise',
    })
  }, 
  privacyTop: function() {
    wx.navigateTo({
      url: './privacy/privacy',
    })
  }, 

  newsTop: function () {
    wx.navigateTo({
      url: './news/news',
    })
  }, 
  opinionTop: function () {
    wx.navigateTo({
      url: './opinion/opinion',
    })
  }, 
  aboutshaiTop: function () {
    wx.navigateTo({
      url: './aboutshai/aboutshai',
    })
  }, 
  
  shpTop:function(){
    wx.navigateTo({
      url: './shopcoo/shopcoo',
    })
  },

  homepageTop:function(){
    wx.navigateTo({
      url: './homepage/homepage',
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})