// pages/intheater/index.js
var intheatersUrl = "https://api.douban.com/v2/movie/in_theaters";
Page({
  data:{
    contentList: [],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 500,
    imgUrls: [],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.getIntheaters();
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
  },
  getIntheaters(){
    var that = this;
    wx.request({
      url: intheatersUrl,
      // header: {}, // 设置请求的 header
      header: {
        'Content-Type': 'json',
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        console.log(res.data.count);
        var tmpContentList = res.data.subjects;
        var tmparr = [];
        var tmpImgObj = [];
        for(let i = 0; i < 6; i++){
          if(i%3===0 && i!==0){
            tmpImgObj = [];
            tmpImgObj.push(tmpContentList[i].images.medium);            
          }else{
            tmpImgObj.push(tmpContentList[i].images.medium);
          }
          if((i+1)%3===0){
            tmparr.push(tmpImgObj);
          }
        }
        that.setData({
          contentList: that.data.contentList.concat(tmpContentList),
          imgUrls: tmparr
        });
      },
      fail: function() {
        // fail
        console.log("fail");
      },
      complete: function() {
        // complete
      }
    })
  }
})