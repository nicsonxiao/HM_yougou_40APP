/* 配置通用的基地址
  1.加遮罩
  2.配置通用的url
  3.使用promise进行改造
*/
import {
  BASE_URL
} from './urls.js'
export const request = params =>{
  //显示正在加载中
  wx.showLoading({
    title: '正在加载中',
    mask:true
  })
  return new Promise(function(resolve,reject){
    wx.request({
      ...params,
      url:BASE_URL+params.url,
      success:res=>{
        resolve(res.data.message);
      },
      fail:err=>{
        reject(err)
      },
      complete:()=>{
        //关闭正在加载的图标
        wx.hideLoading();
      }
    })
  })
}