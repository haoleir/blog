### vue 面试题

1. v-show 和 v-if 的区别

   - v-if 根据条件是否 true，来决定是否渲染 dom 节点；v-show 根据条件是否 true，来决定是否设置 display：none
   - 条件频繁切换，建议用 v-show，因为 dom 的销毁和重建比较耗费性能

2. 为何 v-for 中要用 key

   [VUE 中演示 v-for 为什么要加 key](https://www.jianshu.com/p/4bd5e745ce95)

   > key 的作用是更新组件时判断两个节点是否相同。相同就复用，不相同就删除旧的创建新的。在渲染简单的无状态组件时，如果不添加 key 组件默认都是就地复用，不会删除添加节点，只是改变列表项中的文本值，要知道节点操作是十分耗费性能的。而添加了 key 之后，当对比内容不一致时，就会认为是两个节点，会先删除掉旧节点，然后添加新节点。

   - 必须用 key，且不能是 index 和 random
   - diff 算法中通过 tag 和 key 来判断，是否是 sameNode（原理）
   - 减少渲染次数，提升渲染性能（效果）

3. 描述 vue 组建生命周期（有父子组件的情况）

   - 加载渲染过程

   ```
   　　父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
   ```

   - 子组件更新过程

   ```
   　　父beforeUpdate->子beforeUpdate->子updated->父updated
   ```

   - 销毁子组件过程

   ```
   　　父beforeUpdate->子beforeDestroy->子destroyed->父updated
   ```

   - 销毁父子组件过程

   ```
   　　父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
   ```

   ​ [Vue 父子组件生命周期执行顺序及钩子函数的个人理解](https://www.cnblogs.com/yuliangbin/p/9348156.html)

4. vue 组件如何通讯(常见)

   - 父子间通信 父->子通过`props`、子-> 父`$on、$emit`
   - 获取父子组件实例的方式`$parent、$children`
   - 在父组件中提供数据子组件进行消费 `Provide、inject`
   - `Ref`获取实例的方式调用组件的属性或者方法
   - `Event Bus` 实现跨组件通信
   - `Vuex `状态管理实现通信

5. [描述组件渲染和更新的过程](https://www.cnblogs.com/ming1025/p/13091678.html)

   ![img](https://img2020.cnblogs.com/blog/979149/202006/979149-20200611101848175-251562137.png)

   ```
   //初次渲染
   1.initState ->进行双向绑定
   2.$mount->将template编译成render函数
   3.执行渲染 触发属性getter函数,将渲染watcher 收集到dep中
   4.调用render 函数 生成vnode
   5.patch(elm,vnode)

   //更新
   1.修改data 触发属性setter
   2.然后dep.notify() ->watch.update 派发更新
   3.触发render watcher 的render回调
   4.生成新的vnode
   5.patch(oldVnode,newVnode)
   ```

   1. 渲染过程：
      - 解析模板为 render 函数(或在开发环境已完成)
      - 触发响应式，监听 data 属性的 getter 的依赖收集，也即是往 dep 里面添加 watcher 的过程
      - 执行 render 函数，生成 vnode，patch
   2. 更新过程:
      - 修改 data，setter(必需是初始渲染已经依赖过的)调用 Dep.notify()，将通知它内部的所有的 Watcher 对象进行视图更新
      - 重新执行 render 函数，生成 newVnode
      - 然后就是 patch 的过程(diff 算法)

6. 双向数据绑定 v-model 的实现原理

   - input 元素的 value = this.name
   - 绑定 input 事件 this.name = $event.target.value
   - data 更新触发 re-render

7. vue 路由守卫分几类？

   1. 路由守卫（导航守卫）：

      router.beforeEach：全局前置守卫。
      router.beforeResolve：全局解析守卫。
      router.afterEach：全局后置钩子。

   2. 组件内守卫：

      beforeRouteEnter
      beforeRouteUpdate
      beforeRouteLeave

   3. 路由独享守卫：

      beforeEnter

8. 基于 vue 设计一个购物车（组件结构，vue state 数据结构）

9. 谈谈对组件化的理解？

   [Vue 之组件化理解](https://blog.csdn.net/qq_35387720/article/details/105523595)

   - 数据驱动视图
   - MVVM

10. 用 Object.defineProperty 实现响应式的缺点？

    - 深度监听，需要递归到底，一次性计算量大
    - 无法监听新增属性/删除属性（Vue.set Vue.delete）
    - 无法原生监听数组变化，需要特殊处理

11. 谈谈 vdom 的理解

    - 用 js 模拟 DOM 结构（vnode）
    - 新旧 vnode 对比，得出最小的更新范围，最后更新 DOM
    - 数据驱动视图的模式下，可以有效控制 DOM 操作

12. 谈谈对前端框架中 diff 算法的理解

    - 两个树 diff，时间复杂度是 O(n^3)，算法不可用
    - vDOM diff 算法，把时间复杂度降到了 O(n)，有以下几个要点(不全面)：
      1. 只比较同一层级，不跨级比较
      2. tag（元素标签）不相同，则直接删掉重建，不再深度比较
      3. tag 和 key（例如 v-for 中的 key），两者都相同，则认为是相同节点，不再深度比较

13. [详解 vue 的 diff 算法](https://www.cnblogs.com/wind-lanyan/p/9061684.html)

14. [浅谈 vue-router 原理](https://www.jianshu.com/p/4295aec31302)

15. vuex 中 mutation 和 action 的详细区别

    ```javascript
    const store = new Vuex.Store({
      state: {
        count: 0
      },
      mutations: {
        increment(state) {
          state.count++;
        }
      },
      actions: {
        increment(context) {
          context.commit('increment');
        }
      }
    });

    /*
    
    1、流程顺序
    
    “相应视图—>修改State”拆分成两部分，视图触发Action，Action再触发Mutation。
    
    2、角色定位
    
    基于流程顺序，二者扮演不同的角色。
    
    Mutation：专注于修改State，理论上是修改State的唯一途径。
    
    Action：业务代码、异步请求。
    
    3、限制
    
    角色不同，二者有不同的限制。
    
    Mutation：必须同步执行。
    
    Action：可以异步，但不能直接操作State。
    
    */
    ```

16. 谈谈对 MVVM 的理解

    MVVM 分为 Model、View、ViewMode 三者。

    - Model：代表数据模型，数据和业务逻辑都在 Model 层中定义；

    - View：代表 UI 视图，负责数据的展示；

    - ViewModel：负责监听 Model 中数据的改变并且控制视图的更新，处理用户交互操作；

      Model 和 View 并无直接关联，而是通过 ViewModel 来进行联系的，Model 和 ViewModel 之间有着双向数据绑定的联系，因此当 Model 中的数据改变时会触发 View 层的刷新，View 中由于用户交互操作而改变的数据也会在 Model 中同步。
      这种模式实现了 Model 和 View 的数据自动同步，因此开发者只需要专注对数据的维护操作即可，而不需要自己操作 dom。

17. vue 常见性能优化有哪些？

    - 合理使用 v-show 和 v -if
    - 合理使用 computed
    - v-for 时 加 key，以及避免和 v-if 同时使用
    - 自定义事件 、DOM 事件及时销毁
    - 合理使用异步组件
    - 合理使用 keep-alive
    - data 层架不要太深
    - 使用 v-loader 在开发环境做模版编译（预编译）
    - webpack 层面的一些优化
    - 前端通用的性能优化，如图片懒加载
    - 使用 SSR

18. [谈谈对 v-bind 的理解](https://www.jianshu.com/p/98dfa4c6389c)

19. [vue 是如何做异步渲染的？ $nextTick 原理](https://www.jb51.net/article/189085.htm)

    > 在数据每次变化时，将其所要引起页面变化的部分都放到一个异步 API 的回调函数里，直到同步代码执行完之后，异步回调开始执行，最终将同步代码里所有的需要渲染变化的部分合并起来，最终执行一次渲染操作。
    >
    > 异步队列执行后，存储页面变化的全局数组得到遍历执行，执行的时候会进行一些筛查操作，将重复操作过的数据进行处理，实际就是先赋值的丢弃不渲染，最终按照优先级最终组合成一套数据渲染。
    >
    > 这里触发渲染的异步 API 优先考虑 Promise，其次 MutationObserver，如果没有 MutationObserver 的话，会考虑 setImmediate，没有 setImmediate 的话最后考虑是 setTimeout。

    1. 同步修改 data 时，把修改操作汇总到一个队列中；
    2. 在异步执行时取得这个队列，将其中的修改数据汇总，就像 Object.assign；
    3. 用汇总的结果统一修改 data ，触发试图更新。

20. [vue 做 seo 优化](https://blog.csdn.net/kang_k/article/details/100514042)

21. [Proxy 和 defineproperty 有什么不同?](https://blog.csdn.net/qwe435541908/article/details/107360849/)

22. vue 的三种响应式机制

```javascript
let getDouble = (val) => val * 2;
let obj = {};
let count = 1;
let double = getDouble(count);

/* 1. Object.defineProperty */
Object.defineProperty(obj, 'count', {
  get() {
    return count;
  },
  set(val) {
    count = val;
    double = getDouble(val);
  }
});

obj.count++;
console.log(double);

delete obj.count;
console.log(double);

/* 2. Proxy */
let proxyObj = new Proxy(obj, {
  get(target, prop) {
    return target[prop];
  },
  set(target, prop, val) {
    target[prop] = val;
    if (prop === 'count') {
      double = getDouble(val);
    }
  },
  deleteProperty(target, prop) {
    delete target[prop];
    if (prop === 'count') {
      double = NaN;
    }
  }
});
console.log(obj, proxyObj, obj.count, double);

proxyObj.count = 1;
console.log(obj, proxyObj, obj.count, double);
proxyObj.count++;
console.log(proxyObj.count, obj.count, double);

delete proxyObj.count;
console.log(proxyObj.count, obj.count, double);

/* 3. 对象属性的赋值器（setter）和取值器（getter） */

let countObj = {
  get value() {
    return count;
  },
  set value(val) {
    count = val;
    double = getDouble(val);
  }
};

console.log(countObj.value, count, double);

countObj.value = 2;

console.log(countObj.value, count, double);
```

​

​
