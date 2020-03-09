/*1 onShow
    1 第一次添加商品的时候，手动添加了属性 num和checked
    2 获取购物车缓存数据
    3 把购物车数据，填充到data中
  2 全选的实现，数据的显示
    1 onShow 获取缓存中的购物车数组
    2 根据购物车中的商品数据，如果所有的商品都被选中，checked===true,全选就被选中


  3 总价格和总数量
    1 都需要商品被选中
    2 获取购物车数组
    3 遍历
    4 判断商品是否被选中
    5 总价格 += 商品的单价 * 商品的数量
    6 总数量 += 商品的数量
    7 把计算后的价格和数量，设置回data中即可

  4 商品的选中
    1 绑定change事件
    2 获取到被修改的商品对象
    3 商品对象的选中状态 取反
    4 重新填充回data中和缓存中
    5 重新计算全选，总价格，总数量

  5 全选和反选
    1 全选复选框绑定事件change
    2 获取data中的全选变量 allChecked
    3 直接取反 allChecked=!allChecked
    4 遍历购物车数组，让每个商品的选中状态跟随allChecked改变而改变
    5 把购物车数组和allChecked重新设置回data，购物车重新设置会缓存中

  6 商品数量的编辑
    1 给+ - 绑定点击事件bindtap
      + “+1”   -  “-1”
    2 传递被点击的商品id  goods_id
    3 获取data数组，并修改数组
    4 如果商品的数量为1且用户点击的“-”
      弹窗提示(showModal)询问用户 是否移除商品
      1 确定 直接执行删除
      2 取消 什么都不做
    5 直接修改商品对象的数量num
    6 把cart存回data中，存回缓存中
*/
import {showModal} from "../../utils/asyncWX"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const cart = wx.getStorageSync("cart") || [];
    // const allChecked=cart.length>0?cart.every(v=>v.checked):false;
    this.setCart(cart);
  },

  //绑定商品的change事件
  handleItemChange(e) {
    // console.log(e.currentTarget.dataset.id)
    //获取到商品的id
    const goods_id = e.currentTarget.dataset.id;
    //获取到购物车的数组
    let { cart } = this.data;
    //获取到被点击的商品
    let index = cart.findIndex(v => v.goods_id === goods_id);
    //商品对象状态取反
    cart[index].checked = !cart[index].checked;

    this.setCart(cart);
    // wx.setStorageSync("cart", cart);
    // let allChecked=true;
    // let totalPrice=0;
    // let totalNum=0;
    // cart.forEach(v=>{
    //   if(v.checked){
    //     totalNum+=v.num;
    //     totalPrice+=v.num*v.goods_price
    //   }else{
    //     allChecked=false;
    //   }
    // })

    // //判断数组是否为空
    // allChecked=cart.length!=0?allChecked:false;

    // this.setData({
    //   cart,
    //   allChecked,
    //   totalNum,
    //   totalPrice
    // })
  },

  //全选按钮的功能
  handleAllChecked() {
    //获取购物车数据
    let { cart, allChecked } = this.data;
    //全选取反
    allChecked = !allChecked;
    //每个商品的状态也跟着改变
    cart.forEach(v => (v.checked = allChecked));
    //重新设置回data,缓存和购物车数据
    this.setCart(cart);
  },

  //设置购物中的数据函数
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalNum += v.num;
        totalPrice += v.num * v.goods_price;
      } else {
        allChecked = false;
      }
    });

    //判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;

    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    });
    wx.setStorageSync("cart", cart);
  },

  //商品数量的编辑
  async handleNumEdit(e) {
    //获取商品id
    let { id, operation } = e.currentTarget.dataset;
    //获取购物车数组
    let { cart } = this.data;
    //找到要修改的商品
    const index = cart.findIndex(v => v.goods_id === id);
    //商品数量为1，同时点击"-",给用户提示
    if (cart[index].num === 1 && operation === -1) {
      //弹窗提示
      const res =await showModal({content:"是否移除该商品"})
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
      // wx.showModal({
      //   title: "提示",
      //   content: "是否移除该商品",
      //   success: res => {
      //     if (res.confirm) {
      //       cart.splice(index, 1);
      //       this.setCart(cart);
      //     }
      //   }
      // });
    }else{
    //修改商品对象的数量
    cart[index].num += operation;
    //把cart存回data和缓存中
    this.setCart(cart);
    }
  }
});
