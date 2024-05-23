#### 1. Js 创建 10 个 <a> 标签，点击弹出相应的序号

```javascript
//创建文档片段 ，一次性插入dom节点提高性能
var fraNode = document.createDocumentFragment();

//let创建块级作用域
for (let i = 0; i < 10; i++) {
  var aNode = document.createElement('a');
  aNode.innerHTML = i;
  aNode.style.cssText = 'display:block;margin-bottom:10px;background-color:#ccc;';
  fraNode.appendChild(aNode);
}

var divNode = document.createElement('div');
divNode.id = 'app';
divNode.appendChild(fra);
document.body.appendChild(divNode);

//事件代理
divNode.onclick = function (e) {
  var tar = e.target;
  console.dir(e);
  if (tar.nodeName === 'A') {
    console.log(tar.innerHTML);
  }
};
```

#### 2. 宏任务和微任务的区别？

> 1. 微任务是在 DOM 渲染前执行；宏任务是在 DOM 渲染完成后执行。

![image-20210228121858547](https://cdn.jsdelivr.net/gh/haoleir/file@master/images/image-20210228121858547-2021%2002%2028%2012%2018%20.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>test</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  </head>

  <body>
    <div id="app"></div>
    <script>
      $('#app').append('<p>Hello world!</p>').append('<p>Hello world!</p>').append('<p>Hello world!</p>');
      // console.log('length', $('#app').children().length);
      // alert('本次 call stack 结束，DOM结构已更新，但是未触发渲染');

      setTimeout(() => {
        console.log('length2', $('#app').children().length);
        alert('setTimeout 执行，DOM渲染了吗？');
      }, 0);

      Promise.resolve().then(() => {
        console.log('length1', $('#app').children().length);
        alert('promise.then 执行，DOM渲染了吗？');
      });
    </script>
  </body>
</html>
```

#### 3. 手写 Promise 的 all 方法

```javascript
function PromiseAll(promiseArr) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArr)) {
      reject(new Error('传入的参数必须是数组！'));
    }
    const res = [];
    const promiseNum = promiseArr.length;
    let counter = 0;
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promiseArr[i])
        .then((val) => {
          counter++;
          res[i] = val;
          if (counter === promiseNum) {
            resolve(res);
          }
        })
        .catch((e) => reject(e));
    }
  });
}

//测试
const pro1 = new Promise((res, reject) => {
  setTimeout(() => {
    res('2');
  }, 1000);
});
const pro2 = new Promise((res, reject) => {
  setTimeout(() => {
    res('1');
  }, 1000);
});
const pro3 = new Promise((res, reject) => {
  setTimeout(() => {
    res('3');
  }, 1000);
});

const proAll = PromiseAll([pro1, pro2, pro3])
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
```

#### 4. 请你分析一下，promise，generator，async 三者之间的关系？

```javascript
/*
promise 是一个类函数。当它执行完毕后，会开启异步任务，这个异步任务还得看 promise 本身的状态。通俗来说，它的异步任务就是 then 中的回调函数。promise 诞生的目的不是为了开启异步任务，而是为了解决异步代码的书写格式，尽量实现函数回调的扁平化，所以我们需要把异步代码写在 promise 中进行封装。

对于这三者之间的联系，其实很好理解。我们可以认为它们是每一次版本升级的产物。

也就是说，generator 其实是 promise 的升级版，但它的逻辑和理解却要比 promise 复杂。因此，程序员们在上面要花费一些学习成本，所以我个人不推荐大家使用generator。

而 async 是 generator 的升级版，外界都称它为 generator 的语法糖，那就意味着 async 就是一个小甜点，人人喜欢，因为它简单易懂还好用，顺理成章成为开发者们解决异步方案的不二之选！

*/

//下面有个计时器任务，请用这三种方法依次解决它代码中出现回调地狱的问题。
et t = setTimeout(()=>{
  console.log(1111)
     let t1 = setTimeout(()=>{
         console.log(2222)
         let t2 = setTimeout(()=>{
             console.log(3333)
         },3000)
     },2000)
 },1000);

//1. promise解法
let promiseFn = function(data, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data);
      resolve();
    }, delay);
  });
};

promiseFn(1111, 1000)
  .then(data => {
    return promiseFn(2222, 2000);
  })
  .then(data => {
    return promiseFn(3333, 3000);
  }).catch(err => {console.log(err)});

//2. generator解法
let timer = function(data, delay) {
  setTimeout(() => {
    console.log(data);
  }, delay);
};

let generatorFn = (function*() {
  yield timer(1111, 1000);
  yield timer(2222, 2000);
  yield timer(3333, 3000);
})();

generatorFn.next();
generatorFn.next();
generatorFn.next();

//2. async解法
let timer = function(data, delay) {
  setTimeout(() => {
    console.log(data);
  }, delay);
};

let asyncFn = async function() {
  await timer(1111, 1000);
  await timer(2222, 2000);
  await timer(3333, 3000);
};

asyncFn();
```

#### 5. 怎么用 promise 封装原生 ajax 请求？

```javascript
const queryUrl = 'https://www.baidu.com/sugrec?from=pc_web&wd=' + '平安';

// 1.原生ajax
function ajax(url, success, fail) {
  var client = new XMLHttpRequest();
  client.open('GET', url);
  client.onreadystatechange = function () {
    if (this.readyState !== 4) {
      return;
    }
    if (this.status === 200) {
      success(this.response);
    } else {
      fail(new Error(this.statusText));
    }
  };
  client.send();
}

ajax(
  queryUrl,
  function (data) {
    console.log(data);
  },
  function (err) {
    console.log(err);
  }
);

// 2.promise封装ajax
function promiseAjax(url) {
  return new Promise((resolve, reject) => {
    var client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = function () {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    client.send();
  });
}

promiseAjax(queryUrl)
  .catch(function (err) {
    console.log(err);
  })
  .then(function (data) {
    console.log(data);
  });
```

#### 6. 如何实现 Promise 并行或者串行执行？

```javascript
function sleep(time = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('promise resolved');
      resolve();
    }, time * 1000);
  });
}

const promiseCreatorList = [sleep, sleep, sleep];

// 1.promise.all (promise并行执行)
console.log('promise.all start', new Date().getTime());
Promise.all(promiseCreatorList.map((item) => item())).then(() => {
  console.log('promise.all end', new Date().getTime());
});

// 2.for of async (promise串行执行)
async function main() {
  console.log('for of async start', new Date().getTime());
  async function forOfLoop() {
    for (const promiseInstance of promiseCreatorList) {
      await promiseInstance();
    }
  }
  await forOfLoop();
  console.log('for of async end', new Date().getTime());
}
main();

//3.promise链式调用 (promise串行执行)
const promiseChain = promiseCreatorList.reduce((mem, cur, index, arr) => {
  return mem.then(cur);
}, Promise.resolve());
```

#### 7. 手写一个 LazyMan，实现 sleep 机制

```javascript
/**
 * 编写函数，要求打印如下内容：
 */
// 双越 eat 苹果
// 双越 eat 香蕉
// 双越 开始睡觉
// 双越 已经睡完了 5 s，开始执行下一个任务（等待 5s 后打印）
// 双越 eat 葡萄
// 双越 eat 西瓜
// 双越 开始睡觉
// 双越 已经睡完了 2 s，开始执行下一个任务（等待 2s 后打印）
// 双越 eat 橘子

const me = new LazyMan('双越');

me.eat('苹果').eat('香蕉').sleep(5).eat('葡萄').eat('西瓜').sleep(2).eat('橘子');

class LazyMan {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    setTimeout(() => {
      this.next();
    });
  }

  //next
  next() {
    let task = this.tasks.shift();
    task && task();
  }
  //eat
  eat(food) {
    let task = () => {
      console.log(`${this.name} eat ${food}`);
      this.next();
    };
    this.tasks.push(task);
    return this;
  }
  //sleep
  sleep(time) {
    let task = () => {
      console.log(`${this.name} 开始睡觉`);
      setTimeout(() => {
        console.log(`${this.name} 已经睡完了 ${time} s，开始执行下一个任务`);
        this.next();
      }, time * 1000);
    };
    this.tasks.push(task);
    return this;
  }
}
```

#### 8. new 操作符实现原理

```javascript
var myNew = function (Fn) {
  // 1．创建一个空对象，继承 constructor 的原型
  var obj = {};
  obj.__proto__ = Fn.prototype;
  Fn.prototype.construtor = Fn;

  // 2．将 obj 作为 this ，执行 constructor，传入参数
  var args = Array.prototype.slice.call(arguments, 1);
  var result = Fn.apply(obj, args);

  // 3．分情况返回实例对象 obj
  if (Object.prototype.toString.call(result) == '[object Object]') {
    return result;
  } else {
    return obj;
  }
};

var Fn1 = function (sex) {
  this.name = 'hty';
  this.sex = sex;
};
//返回一个对象
var Fn2 = function () {
  this.name = 'hml';
  return {
    name: 'hty1'
  };
};
//返回非对象
var Fn3 = function () {
  this.name = 'hty3';
  return 1000;
};
const fn1 = myNew(Fn1, '123');
console.log(fn1.name); //hty
console.log(fn1.sex); //123

const fn2 = myNew(Fn2);
console.log(fn2.name); //hty1

const fn3 = myNew(Fn3);
console.log(fn3.name); //hty3
```

#### 9. instanceof 实现原理

```javascript
/**
 * 
 *instanceof主要用于判断某个实例是否属于某个类型，也可用于判断某个实例是否是其父类型或者祖先类型的实例。
 
 *instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false。
 */
var myInstanceof = function (left, right) {
  // left 为 null 或 undefined
  if (left == null) {
    return false;
  }

  // left 为 值类型
  const type = typeof left;
  if (type !== 'object' || type !== 'function') {
    return false;
  }

  const rightVal = right.prototype;
  const leftVal = left.__proto__;
  // 若找不到就到一直循环到父类型或祖类型
  while (true) {
    if (leftVal === null) {
      return false;
    }
    if (leftVal === rightVal) {
      return true;
    }
    leftVal = leftVal.__proto__; // 获取祖类型的__proto__
  }
};
```

#### 10. `typeof`原理

> 不同的对象在底层都表示为二进制，在 Javascript 中二进制前（低）三位存储其类型信息。

- 000: 对象
- 010: 浮点数
- 100：字符串
- 110： 布尔
- 1： 整数

typeof null 为"object", 原因是因为 不同的对象在底层都表示为二进制，在 Javascript 中二进制前（低）三位都为 0 的话会被判断为 Object 类型，null 的二进制表示全为 0，自然前三位也是 0，所以执行 typeof 时会返回"object"。

#### 11. call 实现原理

```javascript
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }

  //如果为 null 或 undefined，上下文赋值为全局对象
  if (context == null) {
    context = globalThis;
  }
  // 值类型，转变为对象
  if (typeof context !== 'object') {
    context = Object(context);
  }

  const fnKey = Symbol();
  context[fnKey] = this;
  const res = context[fnKey](...args);

  delete context[fnKey];

  return res;
};

function fn(a, b, c) {
  console.log(this, a, b, c);
}

fn.myCall({ x: 100 }, 10, 20, 30);
```

#### 12. Apply 实现原理

```javascript
Function.prototype.myApply = function (context, args = []) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }

  //如果为 null 或 undefined，上下文赋值为全局对象
  if (context == null) {
    context = globalThis;
  }
  // 值类型，转变为对象
  if (typeof context !== 'object') {
    context = Object(context);
  }

  const fnKey = Symbol();
  context[fnKey] = this;
  const res = context[fnKey](...args);

  delete context[fnKey];

  return res;
};

function fn(a, b, c) {
  console.log(this, a, b, c);
}

const fn1 = fn.myApply({ x: 200 }, [10, 20, 30]);
```

#### 13. bind 实现原理

```javascript
Function.prototype.myBind = function (context, ...bindArgs) {
  const self = this;
  return function (...newArgs) {
    const args = bindArgs.concat(newArgs);
    return self.apply(context, args);
  };
};

function fn(a, b, c) {
  console.log(this, a, b, c);
}

const fn1 = fn.myBind({ x: 100 }, 10, 20);
fn1(30);
```

#### 14. Object.create 实现原理

```javascript
const myCreate = function (obj) {
  function F() {}
  F.prototype = obj;
  return new F();
};
```

#### 15. 手写一个 curry 函数，把其他函数柯里化

```javascript
function curry(fn) {
  const fnArgsLength = fn.length; //传入函数的参数长度
  let args = [];
  return function calc(...newArgs) {
    args = [...args, ...newArgs]; //积累参数
    if (args.length < fnArgsLength) {
      // 参数不够，返回函数
      return calc;
    } else {
      // 参数够了，执行原函数并返回执行结果
      return fn.apply(this, args);
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

const currySum = curry(sum);
const res = currySum(10)(20)(30);
console.log(res);
```

#### 16. 发布订阅模式

1. test.js

```javascript
//发布订阅模块
const eventEmitter = require('./index.js');
const util = require('util');

function Girl() {}
util.inherits(Girl, eventEmitter);
let girl = new Girl();
console.log('girl: ', girl);

let listener1 = (who) => {
  console.log(who + '哭');
};

let listener2 = (who) => {
  console.log(who + '逛街');
};

girl.on('女生失恋', listener1);
girl.on('女生失恋', listener2);

girl.emit('女生失恋', '我');
```

2. events.js

```javascript
function Events() {
  this._events = Object.create(null);
}

Events.prototype.on = function (eventName, callback) {
  if (!this._events) {
    this._events = Object.create(null);
  }
  if (this._events[eventName]) {
    this._events[eventName].push(callback);
  } else {
    this._events[eventName] = [callback];
  }
};
Events.prototype.emit = function (eventName, ...afgs) {
  if (this._events[eventName]) {
    this._events[eventName].forEach((fn) => {
      fn(...afgs);
    });
  }
};

module.exports = Events;
```

#### 17. 手写一个简易的 jQuery，考虑插件和扩展性

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>手写简易jquery</title>
    <style></style>
  </head>

  <body>
    <p>一段文字1</p>
    <p>一段文字2</p>
    <p>一段文字3</p>

    <script type="text/javascript" src="./test.js"></script>
  </body>
</html>
```

```javascript
class JQuery {
  constructor(selector) {
    const result = document.querySelectorAll(selector);
    const length = result.length;
    for (let i = 0; i < length; i++) {
      this[i] = result[i];
    }
    this.length = length;
    this.selector = selector;
  }
  get(index) {
    return this[index];
  }
  each(fn) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i];
      fn(elem);
    }
  }
  on(type, fn) {
    return this.each(function (elem) {
      elem.addEventListener(type, fn, false);
    });
  }
  //还可以扩展很多DOM操作的API
}

// 插件
/* jQuery.prototype.dialog = function(info) {
	alert(info);
}; */
//...扩展更多的方法

//“造轮子”
class MyJQuery extends JQuery {
  constructor(selector) {
    super(selector);
  }
  //...扩展自己的方法
  addClass(classname) {
    // console.log(classname)
    for (let i = 0; i < this.length; i++) {
      const elem = this[i];
      elem.className += ` ${classname}`;
      // console.log(elem)
    }
  }
  style(data) {}
}

const $p = new JQuery('p');
console.log($p);
console.log($p.get(1));

$p.each((elem) => {
  console.log(elem.nodeName, elem.innerHTML);
});

$p.on('click', (e) => {
  console.log(e.target.innerHTML);
});

const $p1 = new MyJQuery('p');
$p1.addClass('p2');
```

#### 18. 实现字符串 match 方法

```javascript
// 字符串match方法
let str = 'zhufengpeixun2019zhufengpeixun2020@2021';
let reg = /\d+/g;
console.log(str.match(reg));
~(function (str) {
  function execAll(str) {
    if (!this.global) {
      return this.exec(str);
    }
    let ary = [],
      res = this.exec(str);
    while (res) {
      ary.push(res[0]);
      res = this.exec(str);
    }
    return ary.length === 0 ? null : ary;
  }
  RegExp.prototype.execAll = execAll;
})();

console.log(reg.execAll(str));
```

#### 19. 手写自定义事件 EventBus

```javascript
class EventBus {
  constructor() {
    /**
     * {
     *  'key1':[
     *    { fn: fn1, isOnce: false },
     *    { fn: fn2, isOnce: true },
     *   ],
     *  'key2':[],
     *  'key3':[]
     * }
     */

    this.events = {};
  }
  on(key, fn, isOnce = false) {
    if (this.events[key] == null) {
      this.events[key] = [];
    }
    this.events[key].push({ fn: fn, isOnce });
  }
  once(key, fn) {
    this.on(key, fn, true);
  }
  off(key, fn) {
    if (!fn) {
      this.events[key] = [];
    } else {
      // 解绑单个fn
      this.events[key] = this.events[key].filter((item) => item.fn !== fn);
    }
  }
  emit(key, ...args) {
    if (this.events[key] == null) return;

    this.events[key] = this.events[key].filter((item) => {
      const { fn, isOnce } = item;
      fn(...args);

      return !isOnce;
    });
  }
}

const e = new EventBus();

function fn1(a, b) {
  console.log('fn1', a, b);
}
function fn2(a, b) {
  console.log('fn2', a, b);
}
function fn3(a, b) {
  console.log('fn3', a, b);
}

e.on('key1', fn1);
e.on('key1', fn2);
e.once('key1', fn3);
e.once('xxxxxx', fn3);

e.emit('key1', 10, 20);

e.off('key1', fn1);
e.emit('key1', 100, 200);
```

#### 20. 时间字符串的格式化处理

```javascript
~(function () {
  /**
   * formatTime: 时间字符串的格式化处理
   *  @params
   *    template:[string] 我们最后期望获取日期格式的模版
   *    模版规则：{0}->年 {1~5}->月日时分秒
   *  @return
   *    [string]格式化后的时间字符串
   * by zhufengpeixun on 2021/01/17
   */
  function formatTime(template = '{0}年{1}月{2}日 {3}时{4}分{5}秒') {
    let timeAry = this.match(/\d+/g);
    return template.replace(/\{(\d+)\}/g, (...[, $1]) => {
      let time = timeAry[$1] || '00';
      time.length < 2 ? (time = '0' + time) : null;
      return time;
    });
  }
  /*扩展到String。prototype上 */
  ['formatTime'].forEach((item) => {
    String.prototype[item] = eval(item);
  });
})();

let time = '2019-08-13 15:3:56';
console.log(time.formatTime()); //=> 2019年08月13日 15时03分56秒

console.log(time.formatTime('{0}年{1}月{2}日')); //=>2019年08月13日
console.log(time.formatTime('{1}/{2} {3}:{4}:{5}')); //=>08/13 15:03:56秒

time = '2019/08/13';
console.log(time.formatTime()); //=> 2019年08月13日 00时00分00秒

console.log(time.formatTime('{0}年{1}月{2}日')); //=> 2019年08月13日
console.log(time.formatTime('{1}/{2} {3}:{4}:{5}')); //=> 08/13 00:00:00
```

#### 21.

```javascript

```

#### 22. 手写实现 JQuery 中的 each 方法

```javascript
function each(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    let flag = callback.call(arr, arr[i], i);
    if (flag === false) {
      console.log(arr[i]);
      break;
    }
  }
}
```

#### 23. 防抖

> 一定时间内，频繁触发某一操作（比如用户输入）无效，防抖会等待规定时间后来触发一次，从而降低频率。

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>防抖</title>
    <style></style>
  </head>

  <body>
    <input type="text" id="input" />

    <script type="text/javascript">
      let input1 = document.getElementById('input');

      function debounce(fn, delay = 200) {
        let timer = null;
        return function () {
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            //此处this指向当前被监听的dom节点对象，arguments是事件回调函数里的参数，此处指event对象。（下方节流同理）
            fn.apply(this, arguments);
          }, delay);
        };
      }

      //监听dom事件时，事件回调函数里的this指向当前被监听的dom节点对象，参数是event对象。
      input1.addEventListener(
        'input',
        debounce(function (e) {
          console.log(e.target.value);
        }, 500)
      );
    </script>
  </body>
</html>
```

#### 24. 节流

> 一定时间内，频繁触发某一操作（比如拖拽），节流会按照每隔固定时间触发一次，从而降低频率。

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>throttle</title>
    <style>
      #app {
        width: 200px;
        height: 100px;
        line-height: 100px;
        border: 1px solid #cccccc;
        text-align: center;
      }
    </style>
  </head>

  <body>
    <div id="app" draggable="true">拖拽</div>

    <script type="text/javascript" src="./test.js">
            let div1 = document.getElementById('app');

      //1.时间戳写法，特点：第一次触发会立即执行fn
      /* function throttle(fn, delay = 200) {
        let last = 0;
        return function() {
          let now = Date.now();
          if (now - last >= delay) {
            last = now;
            fn.apply(this, arguments);
          }
        };
      } */

      //2.定时器写法，特点：最后一次触发，还是要等delay毫秒后才执行
      /* function throttle(fn, delay = 200) {
        let timer = null;
        return function() {
          if (timer) {
            return;
          }
          timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
          }, delay);
        };
      } */

      //3.完整版本，特点：第一次触发，等delay后才执行，最后一次触发会等remainning后（而不是delay后）执行
      function throttle(fn, delay = 200) {
        let timer = null;
        let startTime = Date.now();
        return function () {
          let curTime = Date.now();
          let remainning = delay - (curTime - startTime);
          const context = this;
          const args = arguments;
          timer && clearTimeout(timer);
          if (remainning <= 0) {
            fn.apply(context, args);
          } else {
            timer = setTimeout(fn, remainning);
          }
        };
      }

      div1.addEventListener(
        'drag',
        throttle(function (e) {
          console.log(e.offsetX, e.offsetY);
        }, 500)
      );
    </script>
  </body>
</html>
```
