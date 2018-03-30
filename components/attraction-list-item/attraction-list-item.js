// component/attraction-list-Item/attraction-list-Item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: ''
    },

    coverImage: {
      type: String,
      value: ''
    },

    images: {
      type: Array,
      value: ''
    },

    rating: {
      type: String,
      value: ''
    },

    protectLevel: {
      type: String,
      value: ''
    },

    tags: {
      type: Array,
      value: ''
    },
    
    dataSource: {
      type: Object,
      value: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickImage() {
      this.triggerEvent('clickItem', this.data.dataSource);
    }
  }
})
