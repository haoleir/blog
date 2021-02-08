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



​	

