import $ from 'jquery';
import { GET_LIST } from '@/config/config';

export default class List {
  constructor(app) {
    this.app = app;
    this.$el = $('<div>');
  }
  //获取数据
  async loadData() {
    const result = await fetch(GET_LIST);
    return result.json();
  }
  //生成列表
  renderItemList(data) {
    data.forEach(ItemData => {
      console.log(ItemData);
    });
  }
  //渲染
  render() {
    this.app.$el.append(this.$el);
  }

  async init() {
    const data = await this.loadData();
    this.renderItemList(data);
    this.render();
  }
}
