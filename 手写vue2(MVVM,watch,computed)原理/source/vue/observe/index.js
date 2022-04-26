import Observe from './observe';
import Watcher from './watcher';
import Dep from './dep';

export function initState(vm) {
  let opts = vm.$options;

  if (opts.data) {
    initData(vm);
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch) {
    initWatch(vm);
  }
}

export function observe(data) {
  if (typeof data !== 'object' || data == null) {
    return;
  }
  if (data.__ob__) {
    return data.__ob__;
  }
  return new Observe(data);
}

function proxy(vm, source, key) {
  //代理数据
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newValue) {
      vm[source][key] = newValue;
    }
  });
}

function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};

  for (let key in data) {
    proxy(vm, '_data', key);
  }

  observe(vm._data);
}

function createComputedGetter(vm, key) {
  let watcher = vm._watchersComputed[key];
  return function () {
    if (watcher) {
      //如果dirty为false,不需要重新执行计算属性中的方法
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}

//计算属性的特点：默认不执行，等用户页面取值时再执行，会缓存取值的结果
//如果依赖的值变化了，会更新dirty属性，再次取值时可以重新求值
//watch方法不能用到模版里，监控的逻辑都放在watch里

//watcher有三类：1渲染watcher；2.用户watcher； 3.计算属性watcher
function initComputed(vm, computed) {
  let watchers = (vm._watchersComputed = Object.create(null));

  for (const key in computed) {
    let userDef = computed[key];
    watchers[key] = new Watcher(vm, userDef, () => {}, { lazy: true }); //lazy是标识这个watcher是计算属性watcher
    Object.defineProperty(vm, key, {
      get: createComputedGetter(vm, key)
    });
  }
}

function createWatcher(vm, key, handler, opts) {
  return vm.$watch(key, handler, opts);
}
function initWatch(vm) {
  let watch = vm.$options.watch;
  for (let key in watch) {
    let userDef = watch[key];
    let handler = userDef;
    if (userDef.handler) {
      handler = userDef.handler;
    }
    createWatcher(vm, key, handler, { immediate: userDef.immediate });
  }
}
