// pages/intheater/index.js
var intheatersUrl = "https://api.douban.com/v2/movie/in_theaters";
var commingsoonUrl = "https://api.douban.com/v2/movie/coming_soon";
var topUrl = "https://api.douban.com/v2/movie/top250";
Page({
  data:{
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 500,
    inTheatersBannerItem: [],
    commingsoonBannerItem: [],
    topContentList: [],
    currentTopCount: 0,
    firstLoadTop: true,
    isLoadingTop: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.getIntheaters();
    this.getCommingsoon();
    this.getTop(this.currentTopCount);
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
            let tmpItem = {};
            tmpItem.imgUrl = tmpContentList[i].images.medium;
            tmpItem.imgTitle = tmpContentList[i].title;
            tmpItem.id = tmpContentList[i].id;
            tmpImgObj.push(tmpItem);            
          }else{
            let tmpItem = {};
            tmpItem.imgUrl = tmpContentList[i].images.medium;
            tmpItem.imgTitle = tmpContentList[i].title;
            tmpItem.id = tmpContentList[i].id;
            tmpImgObj.push(tmpItem);
          }
          if((i+1)%3===0){
            tmparr.push(tmpImgObj);
          }
        }
        that.setData({
          inTheatersBannerItem: tmparr
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
  },
  getCommingsoon(){
    var that = this;
    wx.request({
      url: commingsoonUrl,
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
            let tmpItem = {};
            tmpItem.imgUrl = tmpContentList[i].images.medium;
            tmpItem.imgTitle = tmpContentList[i].title;
            tmpItem.id = tmpContentList[i].id;
            tmpImgObj.push(tmpItem);            
          }else{
            let tmpItem = {};
            tmpItem.imgUrl = tmpContentList[i].images.medium;
            tmpItem.imgTitle = tmpContentList[i].title;
            tmpItem.id = tmpContentList[i].id;
            tmpImgObj.push(tmpItem);
          }
          if((i+1)%3===0){
            tmparr.push(tmpImgObj);
          }
        }
        that.setData({
          commingsoonBannerItem: tmparr
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
  },
  getTop(currentTopCount){
    var that = this;
    var topUrlParams = topUrl + "?start=" + this.data.currentTopCount;
    this.setData({
      isLoadingTop: true
    });
    wx.request({
      url: topUrlParams,
      // header: {}, // 设置请求的 header
      header: {
        'Content-Type': 'json',
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        console.log(res.data.count);
        var tmpContentList = res.data.subjects;
        var currCount = that.data.currentTopCount + res.data.count;
        console.log("currCount: "+currCount);
        that.setData({
          topContentList: that.data.topContentList.concat(tmpContentList),
          currentTopCount: currCount,
          firstLoadTop: false,
          isLoadingTop: false
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
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
    console.log("onPullDownRefresh");
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
    if(!this.data.firstLoadTop && !this.data.isLoadingTop){
      // console.log("onReachBottom");
      this.getTop(this.currentTopCount);
    }
  },
  more(event){
    // console.log(event);
    let filmtype = event.target.dataset.filmtype;
    console.log(filmtype);
    let id = event.currentTarget.id;
    console.log(id);
    switch(filmtype){
      case "intheaters":
        wx.navigateTo({
          url: '../intheater/index',
          success: function(res){
            // success
            console.log("success");
          },
          fail: function() {
            // fail
            console.log("fail");
          },
          complete: function() {
            // complete
            console.log("complete");
          }
        });
        break;
      case "comingsoon":
        wx.navigateTo({
          url: '../comingsoon/index',
          success: function(res){
            // success
            console.log("success");
          },
          fail: function() {
            // fail
            console.log("fail");
          },
          complete: function() {
            // complete
            console.log("complete");
          }
        });
        break;
    }
  },
  filmDetail(event){
    let id = event.currentTarget.id;
    console.log(id);
    wx.navigateTo({
      url: '../subject/index?itemid='+id,
      success: function(res){
        // success
        console.log("success");
      },
      fail: function() {
        // fail
        console.log("fail");
      },
      complete: function() {
        // complete
        console.log("complete");
      }
    })
  }
})