//index.js
//获取应用实例
const app = getApp()
import {request} from "../../request/request.js"
Page({
  data: {
    swiper_list:[],
    cateList:[],
    floorList:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  handleTap(e){
  },

  //加载轮播图数据
  onLoad: function () {
    request({
      url:"/home/swiperdata",
    }).then(res=>{
      // console.log(res)
      this.setData({
        swiper_list:res
      })
    }),
    request({
      url: '/home/catitems'
    }).then(res=>{
      this.setData({
        cateList: res
      })
    }),
    request({
      url: '/home/floordata'
    }).then(res=>{
      this.setData({
        floorList: res
      })
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
