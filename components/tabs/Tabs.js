// components/tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      default: []
    }
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
    handleItemTab(e) {
      // console.log(e);
      // console.log(e.currentTarget.dataset.index);
      const {index} = e.currentTarget.dataset
      // 触发父组件中的事件
      this.triggerEvent("tabsItemChange", {index})
    }
  }
})
