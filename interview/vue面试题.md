### vue面试题

1. v-show和v-if的区别

   - v-if 根据条件是否true，来决定是否渲染dom节点；v-show根据条件是否true，来决定是否设置display：none
   - 条件频繁切换，建议用v-show，因为dom的销毁和重建比较耗费性能

2. 为何v-for中要用key

   [VUE中演示v-for为什么要加key](https://www.jianshu.com/p/4bd5e745ce95)

3. 描述vue组建生命周期（有父子组件的情况）

   - 加载渲染过程

   ```
   　　父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
   ```

   - 子组件更新过程

   ```
   　　父beforeUpdate->子beforeUpdate->子updated->父updated
   ```

   - 父组件更新过程

   ```
   　　父beforeUpdate->父updated
   ```

   - 销毁过程

   ```
   　　父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
   ```

   ​	[Vue父子组件生命周期执行顺序及钩子函数的个人理解](https://www.cnblogs.com/yuliangbin/p/9348156.html)

4. vue组件如何通讯

5. 描述组件渲染和更新的过程

   1. 渲染过程：
      + 解析模板为render函数(或在开发环境已完成)
      + 触发响应式，监听data属性的getter的依赖收集，也即是往dep里面添加watcher的过程
      + 执行render函数，生成vnode，patch
   2. 更新过程:
      - 修改data，setter(必需是初始渲染已经依赖过的)调用Dep.notify()，将通知它内部的所有的Watcher对象进行视图更新
      - 重新执行render函数，生成newVnode
      - 然后就是patch的过程(diff算法)

6. 双向数据绑定v-model的实现原理

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

8. 基于vue设计一个购物车（组件结构，vue state数据结构）

9. 谈谈对组件化的理解？

   [Vue之组件化理解](https://blog.csdn.net/qq_35387720/article/details/105523595)

   - 数据驱动视图
   - MVVM

10. 用Object.defineProperty实现响应式的缺点？

    - 深度舰艇，需要递归到底，一次性计算量大
    - 无法监听新增属性/删除属性（Vue.set Vue.delete）
    - 无法原生监听数组变化，需要特殊处理

11. 谈谈vdom的理解

    - 用js模拟DOM结构（vnode）
    - 新旧vnode对比，得出最小的更新范围，最后更新DOM
    - 数据驱动视图的模式下，可以有效控制DOM操作

12. 谈谈对前端框架中diff算法的理解

    - 两个树diff，时间复杂度是O(n^3)，算法不可用
    - vDOM diff算法，把时间复杂度降到了O(n)，有以下几个要点(不全面)：
      1. 只比较同一层级，不跨级比较
      2. tag（元素标签）不相同，则直接删掉重建，不再深度比较
      3. tag和key（例如v-for中的key），两者都相同，则认为是相同节点，不再深度比较

13. [浅谈vue-router原理](https://www.jianshu.com/p/4295aec31302)

14. vuex中mutation和action的详细区别

    ```javascript
    
    const store = new Vuex.Store({
      state: {
        count: 0
      },
      mutations: {
        increment (state) {
          state.count++
        }
      },
      actions: {
        increment (context) {
          context.commit('increment')
        }
      }
    })
    
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

      

​    

​    