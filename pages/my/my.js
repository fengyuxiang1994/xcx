//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标
      title: '我的', //导航栏 中间的标题
    },

    // 此页面 页面内容距最顶部的距离
    height: app.globalData.navHeight,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    shaishai: [],
    shoucang: [],
    hh: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var that = this,
      userInfo = this.data.userInfo,
      shaishai = this.data.shaishai;
    var shoucang = this.data.shoucang;
    console.log('用户信息')
    console.log(app.globalData.userInfo)
    that.setData({
      zjid: app.globalData.userInfo.id
    })


    if (app.globalData.userInfo != null) {
      that.setData({
        userInfo: app.globalData.userInfo,
      })
      wx: wx.request({
        url: app.globalData.url + 'Look/looking',
        data: {
          user_id: app.globalData.userInfo.id
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log('查看晒晒加载')
          console.log(res);
          console.log(res.data.data)

          that.setData({
            shaishai: res.data.data,
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      });
      wx.request({
        url: app.globalData.url + 'Look/shouCangInfo',
        method: 'GET',
        data: {
          user_id: app.globalData.userInfo.id
        },
        header: {
          'Content-Type': 'application/json'
        },
        success(data) {
          console.log(data.data.data);
          console.log('加载收藏信息成功');
          that.setData({
            shoucang: data.data.data
          });
        }
      })
      wx.request({
        url: app.globalData.url + 'LooK/pingtaiSetting',
        data: {},
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log('查看2')
          console.log(res.data.data);
          that.setData({
            setting: res.data.data
          })
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    if (app.globalData.userInfo != null) {
      wx.request({
        url: app.globalData.url + '/Look/getInfo',
        data: {
          user_id: app.globalData.userInfo.id
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log('olshow加载')
          console.log(res.data)
          app.globalData.userInfo = res.data[0]
          that.onLoad();
        }
      })
    }

  },

  navbarTap: function(e) {
    this.setData({
      hh: e.currentTarget.dataset.index
    })

  },

  godetailInfo1: function(e) {
    console.log('点击1')
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: "/pages/index/details/index?id=" + e.currentTarget.id + "&huuID=" + 111
    })
  },
  godetailInfo2: function(e) {
    console.log('点击2')
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: "/pages/index/details/index?id=" + e.currentTarget.id
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  // /生成海报
  share: function() {
    wx.navigateTo({
      url: './share/index?id=' + this.data.userInfo.id + '&urlimg=' + this.data.userInfo.avatarUrl + '&name=' + this.data.userInfo.nickName
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  goDetail: function(e) {
    console.log('点击')
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: "/pages/index/details/index?id=" + e.currentTarget.id
    })
  },
  gxqmTop: function() {
    // console.log("hh")
    wx.navigateTo({
      url: './setup/information/autograph/autograph',
    })
  },

  bjTop: function() {
    wx.navigateTo({
      url: './setup/setup',
    })
  },
  chNameTop: function() {
    wx.navigateTo({
      url: './setup/information/nickname/nickname',
    })
  },
  qqboTop: function() {
    console.log("HH")
    wx.navigateTo({
      url: './wallet/wallet',
    })
  },
  onGotUserInfo: function(e) {
    var that = this,
      userInfo = this.data.userInfo;
    console.log(wx.getStorageSync('openid'))
    console.log(wx.getStorageSync('session_key'))
    wx.request({
      url: app.globalData.url + '/User/getUserInfo',
      data: {
        openid: wx.getStorageSync('openid'),
        session_key: wx.getStorageSync('session_key'),
        code: app.code,
        // errmsg: app.errmsg,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        rawData: e.detail.rawData,
        signature: e.detail.signature,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log('点击用户信息')
        app.globalData.userInfo = res.data
        wx.setStorageSync('user_info', res.data);

        console.log(res.data)
        that.setData({
          userInfo: wx.getStorageSync('user_info'),

        })
        that.onLoad()
      }
    })
  }
})