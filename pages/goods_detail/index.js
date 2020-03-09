import {request} from "../../request/request"
/*
  1.发送请求获取数据
  2.点击轮播图 预览大图
    1 给轮播图绑定点击事件
    2 调用小程序的api previewImage
  3.点击加入购物车
    1 先绑定点击事件
    2 获取缓存数据 数组格式
    3 判断当前的商品是否存在购物车
    4 已经存在 修改商品 执行购物车数量++ 重新把购物车存回数组 填充缓存
    5 不存在购物车中，直接给购物车数组添加一个新元素，加上数量属性 重新存数组，写入缓存

*/



// 绑定轮播图点击放大预览 previewImage
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    this.getGoodsDetail(goods_id)
  },

  //获取商品详情
  async getGoodsDetail(goods_id){
    const goodsObj =await request({url:"/goods/detail",data:{goods_id}})
    // console.log(res)
    this.goodsDetail=goodsObj;
    this.setData({
      goodsDetail:{
        pics:goodsObj.pics,
        goods_price:goodsObj.goods_price,
        goods_name:goodsObj.goods_name,
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg')
      }
    })
  },

  //点击轮播图预览
  handlePreviewImage(e){
    const urls=this.goodsDetail.pics.map(v=>v.pics_mid);
    // console.log(this.goodsDetail)
     const current= e.currentTarget.dataset.url;
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },

  //添加购物车点击事件
  handleCarAdd(){
    //获取缓存中的数据
    let cart= wx.getStorageSync("cart") || [];

    //判断当前商品是否存在购物车中
     let index= cart.findIndex(v=>v.goods_id===this.goodsDetail.goods_id)
     //如果不存在，加入到购物车中
     if(index===-1){
      this.goodsDetail.num=1;
      this.goodsDetail.checked=true;
      cart.push(this.goodsDetail)
     }
     //存在，执行数量++
     else{
       cart[index].num++
     }
     //把购物车重新添加到缓存中
     wx.setStorageSync("cart", cart);
     //提示
     wx.showToast({
       title: '加入购物车成功',
       icon: 'success',
       mask: true
     });
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