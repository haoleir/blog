import { initState } from './observe';
import Watcher from './observe/watcher';
import { compiler, utils } from './utils.js';

function Vue(options) {
  this._init(options);
}

Vue.prototype._init = function (options) {
  let vm = this;
  vm.$options = options;

  initState(vm);

  // 渲染视图
  if (vm.$options.el) {
    vm.$mount();
  }
};

//渲染页面 讲组件进行挂载
function query(el) {
  if (typeof el === 'string') {
    return document.querySelector(el);
  }
  return el;
}

Vue.prototype._update = function () {
  console.log('更新数据');
  //用用户传入的数据 更新视图
  let vm = this;
  let el = vm.$el;
  //循环这个元素 将里面的内容 换成我们的数据

  // 需要匹配双花括号 {{}} 的方式 来进行替换
  let node = document.createDocumentFragment();
  let firstChild;
  while ((firstChild = el.firstChild)) {
    node.appendChild(firstChild); //appendChild具有剪切移动的功能
  }

  //对{{xxx}}进行替换
  compiler(node, vm);

  el.appendChild(node);

  //依赖收集 属性变化了 需要重新渲染 watcher 和 Dep
};

Vue.prototype.$mount = function () {
  let vm = this;
  let el = vm.$options.el;
  el = vm.$el = query(el);

  let updateComponent = () => {
    //更新组件、渲染的逻辑
    vm._update();
  };

  //首次渲染是通过 Watcher 来渲染的
  new Watcher(vm, updateComponent); //初次渲染 默认会调用 updateComponent

  //数据变化了 需要重新更新视图
};

Vue.prototype.$watch = function (expr, handler, opts) {
  let vm = this;
  new Watcher(vm, expr, handler, { user: true, ...opts });
};

export default Vue;
