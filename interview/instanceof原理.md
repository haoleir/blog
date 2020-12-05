### instanceof原理

```javascript
/**
 * 
 *instanceof主要用于判断某个实例是否属于某个类型，也可用于判断某个实例是否是其父类型或者祖先类型的实例。
 
 *instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false。
 */
var MyInstanceof = function (left, right) {
  const leftVal = left.__proto__
  const rightVal = right.prototype
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

