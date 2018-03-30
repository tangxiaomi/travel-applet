var amapFile = require('../../../libs/amap-wx.js');
Page({
  data: {
    tips: {}
  },
  onLoad: function () {

  },
  bindInput: function (e) {
    var that = this;
    var keywords = e.detail.value;
    // var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: 'c099d1f0cd3330c3c0066fb8f9cac9d4' });
    myAmapFun.getInputtips({
      keywords: keywords,
      location: '',
      success: function (data) {
        if (data && data.tips) {
          that.setData({
            tips: data.tips
          });
        }

      }
    })
  },
  bindSearch: function (e) {
    var keywords = e.target.dataset.keywords;
    var url = '/pages/tabBar/map/map?keywords=' + keywords;
    console.log(url)
    wx.redirectTo({
      url: url
    })
  }
})