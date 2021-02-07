### node事件绑定 核心方法

1. test.js

```javascript
//发布订阅模块
// const eventEmitter = require('events');

const eventEmitter = require('./index.js');
const util = require('util');

function Girl() {}
util.inherits(Girl, eventEmitter);
let girl = new Girl();

//用户绑定事件时 立即触发
// girl.on('newListener', type => {
//   if (type === '失恋') {
//     process.nextTick(()=>{
//       girl.emit(type);
//     })
//   }
// });

// girl.on('失恋', () => {
//   console.log('监听到了 执行1');
// });
// girl.on('失恋', () => {
//   console.log('监听到了 执行2');
// });

let fn1 = () => {
  console.log('监听到了 执行1');
};

girl.once('失恋', fn1);

girl.off('失恋', fn1);

girl.once('失恋', () => {
  console.log('监听到了 执行2');
});

girl.emit('失恋');

// node事件绑定 核心方法
//on once off emit new newListener
```
2. events.js
```javascript
function Events() {
  this._events = Object.create(null);
}

Events.prototype.on = function(eventName, callback) {
  if (!this._events) {
    this._events = Object.create(null);
  }

  if (eventName !== 'newListener') {
    this.emit('newListener', eventName);
  }

  if (this._events[eventName]) {
    this._events[eventName].push(callback);
  } else {
    this._events[eventName] = [callback];
  }
};

Events.prototype.once = function(eventName, callback) {
  let one = () => {
    callback();
    this.off(eventName, one);
  };
  one.l = callback;
  this.on(eventName, one);
};

Events.prototype.off = function(eventName, callback) {
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter(fn => {
      return fn !== callback && fn.l !== callback;
    });
  }
};

Events.prototype.emit = function(eventName, ...afgs) {
  if (this._events[eventName]) {
    this._events[eventName].forEach(fn => {
      fn(...afgs);
    });
  }
};

module.exports = Events;
```