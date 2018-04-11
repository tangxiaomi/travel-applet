var QQMapWX = require('../../../libs/qqmap-wx-jssdk.js');

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

  }

})
