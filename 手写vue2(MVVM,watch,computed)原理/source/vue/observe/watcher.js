let id = 0;

import { pushTarget, popTarget } from './dep';
import { nextTick } from './nextTick';
import { utils } from '../utils';

class Watcher {
  /**
   *
   * @param {*} vm
   * @param {*} exprOrFn 用户传入的可能是一个表达式或函数
   * @param {*} cb 用户传入的回调函数 vm.$watach('msg',cb)
   * @param {*} opts 一些其他参数
   */
  constructor(vm, exprOrFn, cb = () => {}, opts = {}) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn; //getter就是new Watcher传入的第二个参数
    } else {
      this.getter = function () {
        return utils.getValue(vm, exprOrFn);
      };
    }
    if (opts.user) {
      this.user = true;
    }
    this.lazy = opts.lazy;
    this.dirty = this.lazy;
    this.cb = cb;
    this.deps = [];
    this.depsId = new Set();
    this.opts = opts;
    this.immediate = opts.immediate;
    this.id = id++;

    this.value = this.lazy ? undefined : this.get();

    if (this.immediate) {
      this.cb(this.value);
    }
  }

  get() {
    pushTarget(this);
    //默认创建watcher 会调用此方法
    let value = this.getter.call(this.vm);

    popTarget();

    return value;
  }
  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }
  addDep(dep) {
    //让watcher和dep互相记忆
    //同一个watcher 不应该重复记录dep
    let id = dep.id; //每一个响应式对象的属性,都有一个唯一的dep
    if (!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep); //当前watcher记住某个属性对应的dep
      dep.addSub(this); //让dep记住当前的watcher
    }
  }
  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  }
  update() {
    //如果立即调用get 会导致页面刷新 异步来更新
    // this.get();

    // console.log('watcher.id:', this.id);

    if (this.lazy) {
      this.dirty = true;
    } else {
      queueWatcher(this);
    }
  }

  run() {
    let value = this.get();
    if (this.value !== value) {
      this.cb(value, this.value);
    }
  }
}

let has = {};
let queue = [];

function flushQueue() {
  //当前一轮数据全部更新后 再去更新视图 防止每更改一个属性就刷新视图
  queue.forEach((watcher) => watcher.run());
  has = {};
  queue = [];
}

function queueWatcher(watcher) {
  let id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    queue.push(watcher);

    //延迟清空队列
    // setTimeout(flushQueue, 0);

    nextTick(flushQueue); //异步方法会等待所有同步方法执行完后 再调用此方法
  }
}

//渲染要使用它 计算属性 watch
export default Watcher;
