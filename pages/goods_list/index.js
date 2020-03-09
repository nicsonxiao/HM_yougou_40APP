import {request} from "../../request/request";
// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      },
    ],
    goodsList:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },
  //获取商品列表的数据
  async getGoodsList(){
    const res=await request({url:"/goods/search",data:this.QueryParams});
    const total= res.total
    //计算总页数
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize)
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })

    //关闭下拉刷新
    wx.stopPullDownRefresh();
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //1.重置数据
    this.setData({
      goodsList:[]
    })
    //2.重置页码
    this.QueryParams.pagenum=1;

    //3.重新发请求
    this.getGoodsList()
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //判断当前页码是否大于等于总页码
    if(this.QueryParams.pagenum >= this.totalPages){
      //没有下一页数据
      wx.showToast({title: '没有更多数据了'});
    }else{
      //有下一页数据
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  //父组件接收子组件传递过来的事件
  handleTabsItemChange(e){
    //获取被点击标题的索引
    const {index}=e.detail
    //修改源数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>{i===index?v.isActive=true:v.isActive=false});
    this.setData({
      tabs
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})