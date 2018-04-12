var QQMapWX = require('../../../libs/qqmap-wx-jssdk.js');
var util = require("../../../utils/util.js");
var qqmapsdk;

Page({

  data: {

    resData: []

  },

  onLoad: function (options) {

    // 实例化腾讯地图API核心类

    qqmapsdk = new QQMapWX({

      key: '6RSBZ-VYG6Q-MYS54-GACPQ-FWRP3-5SBRQ'
    });

    // 调用接口
    qqmapsdk.calculateDistance({
      mode: 'walking',//步行，驾车为'driving'
      from: {
        latitude: "31.0858147675",
        longitude: "121.6028594971"
      },
      to: [
        {
          latitude: "31.0793200000",
          longitude: "121.6089000000"
        }, 
        {
          latitude: "31.0985200000",
          longitude: "121.5956300000"
        },
        {
          latitude: "31.0329000000",
          longitude: "121.5951000000"
        }
      ],
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },

  onShow: function () {
    var that = this;
    // 腾讯地图调用接口
    qqmapsdk.search({
      keyword: '彩票',
      page_size: 20,
      success: function (res) {
        console.log(res);
        var resData = res.data;
        for (var i = 0; i < resData.length; i++) {
          resData[i]._distance = util.formatDistance(resData[i]._distance);//转换一下距离的格式
        }
        that.setData({ resData: resData });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  }

})
