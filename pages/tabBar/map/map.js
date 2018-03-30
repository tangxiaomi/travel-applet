var amapFile = require('../../../libs/amap-wx.js');
var markersData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    tips: {},
    src: '',
  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  onLoad: function (e) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'c099d1f0cd3330c3c0066fb8f9cac9d4' });
    var params = {
      iconPathSelected: '../../../assets/images/icon-marked.png',
      iconPath: '../../../assets/images/icon-not-marked.png',
      success: function (data) {
        markersData = data.markers;
        var poisData = data.poisData;
        var markers_new = [];
        markersData.forEach(function (item, index) {
          markers_new.push({
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            iconPath: item.iconPath,
            width: item.width,
            height: item.height
          })

        })
        if (markersData.length > 0) {
          that.setData({
            markers: markers_new
          });
          that.setData({
            city: poisData[0].cityname || ''
          });
          that.setData({
            latitude: markersData[0].latitude
          });
          that.setData({
            longitude: markersData[0].longitude
          });
          that.showMarkerInfo(markersData, 0);
        } else {
          wx.getLocation({
            type: 'gcj02',
            success: function (res) {
              that.setData({
                latitude: res.latitude
              });
              that.setData({
                longitude: res.longitude
              });
              that.setData({
                city: '北京市'
              });
            },
            fail: function () {
              that.setData({
                latitude: 39.909729
              });
              that.setData({
                longitude: 116.398419
              });
              that.setData({
                city: '北京市'
              });
            }
          })

          that.setData({
            textData: {
              name: '抱歉，未找到结果',
              desc: ''
            }
          });
        }

      },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
      }
    }
    if (e && e.keywords) {
      params.querykeywords = e.keywords;
    }
    // pol
    myAmapFun.getPoiAround(params)
    // ?
    wx.getSystemInfo({
      success: function (data) {
        var height = data.windowHeight;
        var width = data.windowWidth;
        var size = width + "*" + height;
        myAmapFun.getStaticmap({
          zoom: 8,
          size: size,
          scale: 2,
          markers: "mid,0xFF0000,A:116.37359,39.92437;116.47359,39.92437",
          success: function (data) {
            that.setData({
              src: data.url
            })
          },
          fail: function (info) {
            wx.showModal({ title: info.errMsg })
          }
        })

      }
    }),
    // 逆地址编码 ??
    // myAmapFun.getRegeo({
    //   success: function (data) {
    //     console.log(data)
    //     //成功回调
    //   },
    //   fail: function (info) {
    //     //失败回调
    //     console.log(info)
    //   }
    // });
    // 获取天气
    myAmapFun.getWeather({
      success: function (data) {
        console.log(data);
        //成功回调
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
  },
  showMarkerInfo: function (data, i) { //每个点的信息
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) { //点击那些点点触发的逻辑
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../../assets/images/icon-marked.png"; 
      } else {
        data[j].iconPath = "../../../assets/images/icon-not-marked.png";
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  }
})
