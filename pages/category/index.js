import {request} from "../../request/request.js"
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单列表
    leftMenuList:[],
    //右侧商品数据
    rightContent:[],
    //被点击的左侧的菜单
    currentIndex:0,
    //右侧菜单的距离顶部
    scrollTop:0
  },
  //接口返回数据
  Cates:[],

  // 获取分类数据
  getCates(){
    request({
      url: '/categories'
    }).then(res=>{
      this.Cates=res;
      console.log(res);
      //存储本地数据
      wx.setStorageSync('cates',{time:Date.now(),data:this.Cates});
      //构造左侧菜单数据
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      let rightContent=this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },

  //左侧菜单点击事件
  handleItem(e){
    console.log(e)
    //点击获取选中的index
    const {index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    1先判断本地存储是否有数据
    2 没有数据就直接发起请求
    3 有数据，就直接获取本地存储数据
    */
    const Cates=wx.getStorageSync('cates');
    if(!Cates){
      this.getCates()
    }else{
      //有数据，先判断过期时间,本地存储为5分钟
      if(Date.now()-Cates.time>1000*5*60){
        this.getCates()
      }else{
        this.Cates=Cates.data;
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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