# 手写new&instanceof&call&apply&bind



###  1. new操作符实现原理

```javascript
var myNew = function(Fn) {
  var obj = {}
  obj.__proto__ = Fn.prototype
  Fn.prototype.construtor = Fn
  // 将 arguments 对象转为数组
  var args = Array.prototype.slice.call(arguments, 1)
  // 执行构造函数并改变this对象
  var result = Fn.apply(obj, args)
  if (Object.prototype.toString.call(result) == '[object Object]') {
    return result
  } else {
    return obj
  }
}

var Fn1 = function(sex) {
  this.name = 'hty'
  this.sex = sex
}
//返回一个对象
var Fn2 = function() {
  this.name = 'hml'
  return {
    name: 'hty1'
  }
}
//返回非对象
var Fn3 = function() {
  this.name = 'hty3'
  return 1000
}
const fn1 = myNew(Fn1, '123')
console.log(fn1.name) //hty
console.log(fn1.sex) //123

const fn2 = myNew(Fn2)
console.log(fn2.name) //hty1

const fn3 = myNew(Fn3)
console.log(fn3.name) //hty3
```



### 2. instanceof

```java
/**
 * 
 *instanceof主要用于判断某个实例是否属于某个类型，也可用于判断某个实例是否是其父类型或者祖先类型的实例。
 
 *instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false。
 */
var MyInstanceof = function (left, right) {
  const rightVal = right.prototype
  const leftVal = left.__proto__
  // 若找不到就到一直循环到父类型或祖类型
  while(true) {
      if (leftVal === null) {
          return false
      }
      if (leftVal === rightVal) {
          return true
      }
      leftVal = leftVal.__proto__ // 获取祖类型的__proto__
  }
}
```



### 3. `typeof`原理： **不同的对象在底层都表示为二进制，在Javascript中二进制前（低）三位存储其类型信息**。

- 000: 对象
- 010: 浮点数
- 100：字符串
- 110： 布尔
- 1： 整数

typeof null 为"object", 原因是因为 不同的对象在底层都表示为二进制，在Javascript中二进制前（低）三位都为0的话会被判断为Object类型，null的二进制表示全为0，自然前三位也是0，所以执行typeof时会返回"object"。



### 4. call

```javascript
Function.prototype.myCall=function(context){
        if(typeof this!=='function'){
            throw new TypeError('Error');
        }
        context = context || window;
        context.fn = this;
        const args = [...arguments].slice(1);
        const result = context.fn(...args);
        delete context.fn;
        return result;
    }
```



### 5. Apply

```javascript
 Function.prototype.myApply = function(context){
    if(typeof this !== 'function'){
        throw new TypeError('Error');
    }
    context = context || window;
    context.fn = this;
    let result;
    if(arguments[1]){
        result = context.fn(...arguments[1]);
    }else{
        result = context.fn();
    }
    delete context.fn;
    return result;
}
```



### 6.bind

```javascript
Function.prototype.myBind = function(context){
    if(typeof this !== 'function'){
        throw new TypeError('Error');
    }
    const _this = this;
    const argus = [...arguments].slice(1);
    return function F(){
        //因为返回了一个函数，可以new F(),所以需要判断
        if(this instanceof F){
            return new _this(...argus,...arguments);
        }
        return _this.apply(context,argus.concat(...arguments));
    }
}
```

