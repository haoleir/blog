import { observe } from './index';
import { arrayMethods, observeArray, dependArray } from './array';

import Dep from './dep';

function defineReactive(data, key, value) {
  //如果value还是一个对象 需要深度观察
  let childOb = observe(value); //递归观察 {} {arr:[1,2,3]}

  let dep = new Dep();
  Object.defineProperty(data, key, {
    //依赖收集
    get() {
      // console.log('获取数据', key, value);
      if (Dep.target) {
        //我们希望存入的watcher不重复 如果重复会造成更新时多次渲染
        dep.depend();
        if (childOb) {
          //数组的依赖收集 {arr:[[1],2,3]}
          childOb.dep.depend(); //数组也收集了当前Watcher
          dependArray(value);
        }
      }
      return value;
    },
    //通知依赖更新
    set(newValue) {
      if (newValue === value) return;
      observe(newValue); //如果设置的值是对象，也需要被观察
      value = newValue;
      // console.log('设置数据', key, newValue);
      dep.notify();
    }
  });
}

class Observe {
  constructor(data) {
    this.dep = new Dep(); //此 dep 专门为数组设定

    //每个对象 包括数组都有一个__ob__属性，返回的是当前 Observer 实例
    Object.defineProperty(data, '__ob__', {
      get: () => this
    });

    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods; //拦截数组方法
      observeArray(data); //观测数组每一项
    } else {
      this.walk(data);
    }
  }

  walk(data) {
    let keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = data[keys[i]];

      // 对每一个属性进行重新定义
      defineReactive(data, key, value);
    }
  }
}

export default Observe;
