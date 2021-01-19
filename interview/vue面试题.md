### vue面试题

1. v-show和v-if的区别

   - v-if 根据条件是否true，来决定是否渲染dom节点；v-show根据条件是否true，来决定是否设置display：none
   - 条件频繁切换，建议用v-show，因为dom的销毁和重建比较耗费性能

2. 为何v-for中要用key

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

6. 双向数据绑定v-model的实现原理

7. vue 路由守卫分几类？

   1.  路由守卫（导航守卫）：

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