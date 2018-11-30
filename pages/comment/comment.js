// hh/hh.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    numb:'', //评论个数
    options:'',  //路由传参
    showModalStatus: false,
    show: false,
    userId: '',
    plid: '',
    arr: '',
    hyt: '',
    usid: '',
    plname: '',
    msg_tips: '快来写下你的评论吧', //  输入框默认提示文字
  },

  navigate_reply: function(e) {

  },

  powerDrawer: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;

    var plid = e.currentTarget.dataset.plid
    var usid = e.currentTarget.dataset.usid
    this.setData({
      plid: plid,
      usid: usid
    })
    this.util(currentStatu)
  },
  util: function(currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0 //0则不延迟
    });
    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停
    animation.translateY(240).step();
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function() {
      // 执行第二组动画：Y轴不偏移，停
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })
      //关闭抽屉
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)
    // 显示抽屉
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.options = options
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },



  onPostTap: function(e) {
    var hhArr = this.data.arr;
    var that = this;
    var item_id = e.currentTarget.dataset.plid;
    var item_indexx = e.currentTarget.dataset.index;
    console.log(item_id)
    console.log(item_indexx)
    console.log(hhArr[item_indexx])
    if (hhArr[item_indexx]) {
      var hasChange = hhArr[item_indexx].hasChange;
      console.log(hasChange)
      if (hasChange !== undefined) {
        var num = hhArr[item_indexx].num;
        console.log(num)
        if (!hasChange) {
          if (hhArr[item_indexx].num == 0) {
            hhArr[item_indexx].num =1;
          }else{
            hhArr[item_indexx].num = num + 1;
          }

          hhArr[item_indexx].hasChange = true;
          console.log(hhArr[item_indexx].num)
          wx.request({
            url: app.globalData.url + 'Look/commentDianZan',
            data: {
              user_id: app.globalData.userInfo.id,
              zan_count: hhArr[item_indexx].num,
              comment_id: item_id
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function(res) {
              console.log(res.data);
            }
          })
        } else {
          hhArr[item_indexx].num = num - 1;
          hhArr[item_indexx].hasChange = false;
          // console.log(hhArr[item_indexx].user_praise)
          wx.request({
            url: app.globalData.url + 'Look/commentDianZan',
            data: {
              user_id: app.globalData.userInfo.id,
              zan_count: hhArr[item_indexx].user_praise,
              comment_id: item_id
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function(res) {
              console.log(res.data);
            }
          })
        }
        this.setData({
          arr: hhArr
        })
      }
    }
  },
  // 回复

  plidon: function(e) {
    var id = e.currentTarget.dataset.plid;
    var usid = e.currentTarget.dataset.usid
    console.log("我评论别人文章")
    console.log(id)
    console.log(usid)
    this.setData({
      hyt: id,
      usid: usid,
      show: true,
    })
  },


  powerDrawereeee: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    console.log("我评论自己文章")
    var hyt = this.data.plid
    var usid = this.data.usid;
    console.log(hyt)
    console.log(usid);
    this.setData({
      hyt: hyt,
      usid: usid,
      show: true,
      msg_tips: '快来写下你的评论吧'
    })
  },

  get_input: function(e) {
    this.setData({
      plname: e.detail.value
    })
  },

  pb: function(e) {
    this.plidon()
    var that = this
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    console.log("@@@@@@@@@@@@@@@@")
    console.log(that.data.hyt)
    return
    wx.request({
      url: app.globalData.url + 'Caogao/userPb',
      data: {
        user_id: that.data.usid,
        comment_id: that.data.hyt
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
      }
    })

  },
  ts: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    wx.showLoading({
      title: '投诉',
    })
  },

  // 评论提交
  send_form: function(e) {
    console.log("公共的提交")
    // console.log(e)
    var hhArr = this.data.arr;
    // console.log(hhArr)
    var that = this
    var id = this.data.hyt
    // var plid = this.data.plid
    var name = this.data.plname
    var usid = this.data.usid;
    wx.request({
      url: app.globalData.url + 'Comment/commentReply',
      data: {
        from_user_id: app.globalData.userInfo.id,
        comment_id: id,
        reply_msg: name,
        to_user_id: usid
      },
      header: {
        'Content-Type': 'application/json'
      },
       success: function (res) {
        console.log(res)
        that.setData({
          show: false,  
          arr: hhArr
        })
      }
    })

    this.request()
    
  },
  // 评论提交结束


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
     this.request()
  },

  //封装函数
  request(){

    var that = this;
    that.setData({
      navH: app.globalData.navHeight,
      userId: app.globalData.userInfo.id,
      shu: that.data.options.shu,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      userhid: that.data.options.userhid
    })
    console.log(app.globalData.userInfo.id)
    console.log("YY")
    console.log(that.data.options.userhid)
    console.log(that.data.options.id);
    var id = that.data.options.id
    console.log("HH")
    console.log(id)
    wx.request({
      url: app.globalData.url + 'Search/commentList',
      data: {
        article_id: id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("活动")
        console.log(res.data)
        that.setData({
          arr: res.data,
          numb: res.data.length
        })
        console.log(that.data.arr)
      }
    });

    if (that.data.options.comment_id) {
      this.setData({
        hyt: that.data.options.comment_id,
        usid: that.data.options.user_id,
        show: true,
        msg_tips: '回复: ' + that.data.options.user_name
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  shanchu: function(e) {
    var plid = this.data.plid
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    console.log(plid)
    wx.request({
      url: app.globalData.url + 'Comment/deleteReply',
      data: {
        comment_id: plid
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
      }
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})