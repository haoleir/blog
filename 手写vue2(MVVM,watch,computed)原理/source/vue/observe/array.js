import { observe } from './index';

let oldArrayMethods = Array.prototype;

export let arrayMethods = Object.create(oldArrayMethods);

let mehthods = ['push', 'unshift', 'pop', 'shift', 'sort', 'reverse', 'splice'];

export function observeArray(inserted) {
  for (let i = 0; i < inserted.length; i++) {
    observe(inserted[i]);
  }
}

export function dependArray(value) {
  for (let i = 0; i < value.length; i++) {
    let currentItem = value[i]; //有可能也是一个数组 arr:[[[[]]]]
    currentItem.__ob__ && currentItem.__ob__.dep.depend();
    if (Array.isArray(currentItem)) {
      //递归收集数组的依赖
      dependArray(currentItem);
    }
  }
}

mehthods.forEach((method) => {
  arrayMethods[method] = function (...args) {
    let r = oldArrayMethods[method].apply(this, args);

    // 如果是往数组中添加对象，那添加的元素也需要被观察
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2); //获取splice新增的功能
        break;
      default:
        break;
    }
    if (inserted) {
      observeArray(inserted);
    }

    console.log('调用了数组新方法 --更新视图');
    this.__ob__.dep.notify(); //通知视图更新
    return r;
  };
});
