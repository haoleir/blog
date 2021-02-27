### 1.  nodejs如何避免回调地狱

```javascript
/**
 * 1.promise
 * 2.async await
 * 3.模块化：将回调函数分割为独立的函数
 */

var fs = require('fs');
var promisify = require('util').promisify;
var read = promisify(fs.readFile);

read('./doc/text/rss_feeds.txt')
	.then(function(data) {
		console.log(data.toString());
	})
	.catch(function(err) {
		console.log(err);
	});


async function test() {
	try {
		var data = await read('./doc/text/rss_feeds.txt');
		console.log(data.toString());
	} catch (err) {
		console.log(err);
	}
}
test()
```

### 2. [图片懒加载原理](https://www.cnblogs.com/zhuzhenwei918/p/6943156.html)

> 图片懒加载的原理很简单，就是我们先设置图片的data-set属性（当然也可以是其他任意的，只要不会发送http请求就行了，作用就是为了存取值）值为其图片路径，由于不是src，所以不会发送http请求。 然后我们计算出页面scrollTop的高度和浏览器的高度之和， 如果图片距离页面顶端的坐标Y（相对于整个页面，而不是浏览器窗口）小于前两者之和，就说明图片就要显示出来了（合适的时机，当然也可以是其他情况），这时候我们再将 data-set 属性替换为 src 属性即可。

### 3. [如何构建大型的前端项目](https://segmentfault.com/a/1190000016647822)

###  4. 普通函数如何执行？

	1. 形成一个私有作用域
	2. 形参赋值
	3. 变量提升
	4. 代码执行
	5. 栈内存释放问题

###  5. 如何理解原型链？

	1. 所有的函数数据类型都有一个属性：prototype ，这个属性的值是一个对象，浏览器会默认给它开辟一个堆内存
	2. 在浏览器给 prototype 开辟的堆内存中有一个属性：constructor ，这个属性存储的值是当前函数本身
	3. 每一个对象都有一个 __proto__ 的属性，这个属性指向当前实例所属类的 prototype（如果不能确定它是谁的实例，那么都是Object的实例）

### 6. 什么是面向对象？

- 面向对象是一种编程思想， Js本身就是基于面向对象构建出来的（例如： JS中有很多内置类，像Promise就是ES6中新增的一个内置类，我们可以基于new Promise来创建一个实例，来管理异步编程，我在项目中也经常用Promise， 自己也研究过它的源码...） ，我之前看过一点框架源码，我们平时用的VUE/REACT/JQUERV也是基于面向对象构建出来的，他们都是类，平时开发的时候都是创建他们的实例来操作的；当然我自己在真实项目中，也封装过一些组件插件（例如 Dialog 、 拖拽），也是基于面向对象开发的，这样可以创造不同的实例，来管理私有的属性和公有的方法，很方便...

- JS中的面向对象，和其它编程语言还是有略微不同的， Js中类和实例是基于原型和原型链机制来处理的；而且Js中关于类的重载、重写、继承也和其它语言不太一样

### 7. js中的原型继承

1. 让父类中的属性和方法在子类实例的原型链上

	* CHILD.prototype = new PARENT ();

	* CHILD.prototype. constructor = CHILD;
2. 特点：
   - 不像其他语言中的继承一样（其它语言的继承一般是拷贝继承，也就是子类继承父类，会把父类中的属性和方法拷贝一份到子类中，供子类的实例调取使用） ，它是把父类的原型放到子类实例的原型链上，实例想调取这些方法，是基于—proto—原型链查找机制完成的；
   - 子类可以重写父类上的方法（这样会导致父类其它的实例也受到影响）；
   - 父类中私有或者公有的属性方法，最后都会变为子类中公有的属性和方法。

### 8. js中的call或apply继承

- CHILD方法中把PARENT当做普通函数执行，让PARENT中的THIS指向CHILD的实例，相当于给CHILD的实例设置了很多私有的属性或者方法

- 只能继承父类私有的属性或者方法（因为是把PARENT当做普通函数执行，和其原型上的属性和方法没有关系）
- 父类私有的变为子类私有的

### 9. js中的寄生组合继承

​	call继承 +  Object.create(Parent.prototype)

```javascript
function Parent(x) {
  this.x = x;
}

Parent.prototype.getX = function() {
  console.log(this.x);
  return this.x;
};

function Child(y) {
  Parent.call(this, 'parent'); //执行父类构造函数，把this传入，相当于继承父类的私有属性或方法
  this.y = y;
}

Child.prototype = Object.create(Parent.prototype); //继承父类的公有属性或方法

Child.prototype.getY = function() {
  console.log(this.y);
  return this.y;
};

let child = new Child('child');

console.log(child.y);
child.getY();

console.log(child.x);
child.getX();
```

### 10. 请实现 (5).add(3).minus(2) 并输出 6

```javascript
(function() {
  function check(n) {
    n = Number(n);
    return isNaN(n) ? 0 : n;
  }

  function add(n) {
    check(n);
    return this + n;
  }
  function minus(n) {
    check(n);
    return this - n;
  }

  ['add', 'minus'].forEach(item => {
    Number.prototype[item] = eval(item);
  });
})();

console.log((5).add(3).minus(2));
```

### 11. 箭头函数和普通函数的区别？

+ 箭头函数语法上比普通函数更加简洁（ES6中每一种函数都可以使用形参赋默认值和剩余运算符）
+ 2.箭头函数没有自己的THIS，它的THIS是继承函数所处上下文中的THIS （使用CALL/APPY等任何方式都无法改变THIS的指向）
+ 3.箭头函数中没有ARGUMENTS （类数组） ，只能基于...ARG获取传递的参数集合（数组）
+ 4.箭头函数不能被new执行（因为：箭头函数没有this也没有prototype)

### 12. 手写实现JQuery中的each方法

```javascript
function each(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    let flag = callback.call(arr, arr[i], i);
    if (flag === false) {
      console.log(arr[i])
      break;
    }
  }
}

each([10, 20, 30, 40], function(item, index) {
  if (index > 1) {
    return false;
  }
});
```

### 13. git工作流程？

1. fork我的项目
2. git clone https://github.com/你自己的名字/node201509_homework.git
3. cd node201509_homework
4. 添加你的新的文件
5. git add -A
6. git commit -m "提交xx第一个练习"
7. git push origin master
8. 发起一个pullrequest
9. 由源仓库作者合并pullrequest

### 14. 实现字符串match方法

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

### 15. 获取一个字符串中出现次数最多的字母

```javascript
// 获取一个字符串中出现次数最多的字母

let str = 'zhufengpeixunzhoulaoshi';

/**
 * 第一种方法：去重思维
 */
// let max = 1,
//   res = [],
//   obj = {};
// [].forEach.call(str, char => {
//   if (typeof obj[char] !== 'undefined') {
//     obj[char] += 1;
//     if (obj[char] > max) {
//       max = obj[char];
//     }
//     return;
//   }
//   obj[char] = 1;
// });
// res = Object.keys(obj)
//   .filter(k => obj[k] === max);
// console.log(`出现次数最多的字母为：${res}，次数为：${max}`);

/**
 * 第二种方法：排序思维
 */
// str = str
//   .split('')
//   .sort((a, b) => a.localeCompare(b))
//   .join('');
// let reg = /([a-zA-Z])\1+/g;
// let ary = str.match(reg).sort((a, b) => b.length - a.length);

// let max = ary[0].length;
// let res = ary
//   .filter(i => i.length === max)
//   .map(i => i[0]);

// console.log(`出现次数最多的字母为：${res}，次数为：${max}`);

/**
 * 第三种方法：动态正则匹配
 */

// let max = 0,
//   res = [],
//   flag = false;

// str = str
//   .split('')
//   .sort((a, b) => a.localeCompare(b))
//   .join('');

// for (let i = str.length; i > 0; i--) {
//   let reg = new RegExp('([a-zA-Z])\\1{' + (i - 1) + '}', 'g');
//   str.replace(reg, (content, $1) => {
//     max = i;
//     res.push($1);
//     flag = true;
//   });
//   if (flag) {
//     break;
//   }
// }
// console.log(`出现次数最多的字母为：${res}，次数为：${max}`);

/**
 * 第四种方法：动态删字母
 */

let max = 0,
  count = 0,
  obj = {},
  res = [],
  reg,
  oldLen,
  letter,
  newLen;

while (str !== '') {
  oldLen = str.length;
  letter = str.substr(0, 1);
  reg = new RegExp(letter, 'g');
  str = str.replace(reg, '');
  newLen = str.length;
  count = oldLen - newLen;
  if (count >= max) {
    obj[letter] = count;
    max = count;
    res.push(letter);
  }
}

//由于第一项总会添加进res中，所以要做检验
if (obj[res[0]] !== max) {
  res.shift();
}

console.log(`出现次数最多的字母为：${res}，次数为：${max}`);
```

### 16. 时间字符串的格式化处理

```javascript
~(function() {
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
  ['formatTime'].forEach(item => {
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

### 17. 数字以千分符分割

```javascript
let num = '15628954';
num = '12345678256874';

/* 1.传统方法 */
// function millimeter(num) {
//   num = num
//     .split('')
//     .reverse()
//     .join('');
//
//   for (let i = 2; i < num.length - 1; i += 4) {
//     let prev = num.substring(0, i + 1),
//       next = num.substring(i + 1);
//     num = prev + ',' + next;
//   }

//   num = num
//     .split('')
//     .reverse()
//     .join('');
//   return num;
// }

// console.log(millimeter(num)); //=> 12,345,678,256,874

/* 2.正则 */
~(function() {
  /**
   * millimeter: 数字以千分符分割
   * @param
   *  num[string] 传入的数字
   * @return
   *  num[string] 分割后的数字
   *
   * by zhufengpeixun on 2021/01/17
   */
  function millimeter() {
    return this.replace(/\d{1,3}(?=(\d{3})+$)/g, content => (content = content + ','));
  }
  /*扩展到String。prototype上 */
  ['millimeter'].forEach(item => {
    String.prototype[item] = eval(item);
  });
})();

console.log(num.millimeter()); //=> 12,345,678,256,874
```

### 17.  [flexbox 弹性盒布局和布局原理](https://blog.csdn.net/lihongxun945/article/details/45458717/)