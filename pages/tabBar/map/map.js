var QQMapWX = require('../../../libs/qqmap-wx-jssdk.js');

var qqmapsdk;

Page({

  onLoad: function () {

    // 实例化API核心类

    qqmapsdk = new QQMapWX({

      key: '6RSBZ-VYG6Q-MYS54-GACPQ-FWRP3-5SBRQ'

    });

  },

  onShow: function () {

    // 调用接口

    qqmapsdk.search({

      keyword: '彩票',

      success: function (res) {

        console.log(res);

      },

      fail: function (res) {

        console.log(res);

      },

      complete: function (res) {

        console.log(res);

      }

    });
  }
  });