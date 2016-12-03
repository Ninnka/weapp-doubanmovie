// pages/subject/index.js
Page({
  data:{
    itemid: ""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("itemid: "+options.itemid);
    this.setData({
      itemid: options.itemid
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})