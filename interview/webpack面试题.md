### webpack面试题

1. 前端代码为何要进行构建和打包？

2. module chunk bundle分别什么意思，有何区别？ 

3. loader和plugin的区别？

   - 对于loader，它就是一个转换器，将A文件进行编译形成B文件，这里操作的是文件，比如将A.scss或A.less转变为B.css，单纯的文件转换过程；

   - 对于plugin，它就是一个扩展器，它丰富了wepack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务。

4. webpack如何实现懒加载？

   懒加载的本质就是到需要的时候在去创建script标签去加载对应的资源。

5. webpack常见性能优化有哪些？

   - 优化Loader的文件搜索范围（对于Loader，影响打包效率的是它的属性Babel.Babel会将代码转为字符串 生成AST，然后对AST继续进行转变最后生成新的代码，项目越大，转换代码越多，效率就越低。）
   - HappyPack（HappyPack可以将Loader的同步执行转换为并行的）
   - DllPlugin（DllPlugin可以将特定的类库提前打包然后引入）
   -  Scope Hoisting（Scope Hoisting会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去）
   - Tree Shaking （可以实现删除项目中未被引用的代码）

6. babel-runtime和babel-polifill的区别