1. 如何理解HTML语义化？

   1. 让人更容易读懂（增加代码可读性）
   2. 让搜索引擎更容易读懂（SEO）

2. Javascript 获取 Dom 样式的方法有哪些？

   1. document.getElementById('el') console.log(el.style.width)；

   2. element.currentStyle 属性；

   3. var el = document.getElementById('el') ;

      console.log(window.getComputedStyle(element).getPropertyValue('width')); // jQuery的CSS()方法就是用此方法的；

   4. element.getBoundingClientRect()方法

      var el = document.getElementById('el');
   
      el.getBoundingClientRect().width // 获取宽度

```javascript
/*
使用 element.style 来获取DOM节点样式属性的方法，这个方法只能获取到行内样式的样式属性，却无法获取内联或外联样式的属性，若把样式写在行内，不仅使代码难以阅读，还降低了代码的可维护性，有违结构层、表现层分离的原则，不是一个好的方法。接下来要介绍一个方法： 
document.defaultView.getComputedStyle 这是w3c标准方法， 如果是旧版IE（ie8及以下）,可以用 element.currentStyle的方法，兼容性写法如下：
*/
function getStyle(obj, arr) {
  if (obj.currentStyle) {//所有的ie
      return obj.currentStyle[arr];
  } else if(window.getComputedStyle){//ie9+ chrome fireFox
      return document.defaultView.getComputedStyle(obj, null)[arr];
  }
  return null;
}
```



3. 浏览器盒模型

   1. ```css
      box-sizing: content-box|border-box|inherit;
      ```

   2. javascript中的offsetWidth、clientWidth、innerWidth及相关属性方法

      ```javascript
      //
      /*
       ****** 元素视图属性
       * offsetWidth 水平方向 width + 左右padding + 左右border-width
       * offsetHeight 垂直方向 height + 上下padding + 上下border-width
       * 
       * clientWidth 水平方向 width + 左右padding
       * clientHeight 垂直方向 height + 上下padding
       * 
       * offsetTop 获取当前元素到 定位父节点 的top方向的距离
       * offsetLeft 获取当前元素到 定位父节点 的left方向的距离
       * 
       * scrollWidth 元素内容真实的宽度，内容不超出盒子高度时为盒子的clientWidth
       * scrollHeight 元素内容真实的高度，内容不超出盒子高度时为盒子的clientHeight
       * 
       ****** 元素视图属性结束
       * 
       ****** Window视图属性（低版本IE浏览器[<IE9]不支持） 【自测包含滚动条，但网络教程都说不包含？？？】
       * innerWidth 浏览器窗口可视区宽度（不包括浏览器控制台、菜单栏、工具栏） 
       * innerHeight 浏览器窗口可视区高度（不包括浏览器控制台、菜单栏、工具栏）
       * ***** Window视图属性结束
       * 
       ****** Document文档视图
       * （低版本IE的innerWidth、innerHeight的代替方案）
       * document.documentElement.clientWidth 浏览器窗口可视区宽度（不包括浏览器控制台、菜单栏、工具栏、滚动条）
       * document.documentElement.clientHeight 浏览器窗口可视区高度（不包括浏览器控制台、菜单栏、工具栏、滚动条）
       * 
       * document.documentElement.offsetHeight 获取整个文档的高度（包含body的margin）
       * document.body.offsetHeight 获取整个文档的高度（不包含body的margin）
       * 
       * document.documentElement.scrollTop 返回文档的滚动top方向的距离（当窗口发生滚动时值改变）
       * document.documentElement.scrollLeft 返回文档的滚动left方向的距离（当窗口发生滚动时值改变）
       ****** Document文档视图结束
       * 
       ****** 元素方法
       * 1. getBoundingClientRect() 获取元素到body
       *  bottom: 元素底边（包括border）到可视区最顶部的距离
       *  left: 元素最左边（不包括border）到可视区最左边的距离
       *  right: 元素最右边（包括border）到可视区最左边的距离
       *  top: 元素顶边（不包括border）到可视区最顶部的距离
       *  height: 元素的offsetHeight
       *  width: 元素的offsetWidth
       *  x: 元素左上角的x坐标 
       *  y: 元素左上角的y坐标 
       * 
       * 2. scrollIntoView() 让元素滚动到可视区
       * 
       * ***** 元素方法结束
       * 
       */
      ```

4. margin负值问题

   * margin-top 和 margin-left 负值，元素向上、向左移动；
   * margin-right 负值，右侧元素向左移动，自身不受影响（视觉上感觉自身宽度在缩小，导致相邻右侧元素左移）；
   * margin-bottom 负值，下方元素向上移动，自身不受影响（视觉上感觉自身高度在缩小，导致相邻右侧元素左移）；

5. BFC形成条件和应用

   1. 形成条件
      + 浮动元素，float 除 none 以外的值； 
      + 定位元素，position（absolute，fixed）； 
      + display 为以下其中之一的值 inline-block，table-cell，table-caption； 
      + overflow 除了 visible 以外的值（hidden，auto，scroll）；
   2. BFC的特性
      + 内部的Box会在垂直方向上一个接一个的放置。
      + 垂直方向上的距离由margin决定
      + bfc的区域不会与float的元素区域重叠。
      + 计算bfc的高度时，浮动元素也参与计算
      + bfc就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。

6. 圣杯布局

   ```html
   <!DOCTYPE html>
   <html lang="en">
   	<head>
   		<meta charset="UTF-8" />
   		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
   		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
   		<title>圣杯布局</title>
   	</head>
   	<style>
   		* {
   			padding: 0;
   			margin: 0;
   		}
   		#header {
   			height: 50px;
   			background: #cccccc;
   		}
   		.column {
   			height: 200px;
   			float: left;
   		}
   		#container {
   			padding: 0 200px 0 150px;
   		}
   		#left {
   			width: 150px;
   			background: red;
   			margin-left: -100%;
   			position: relative;
   			right: 150px;
   		}
   		#center {
   			width: 100%;
   			background: yellow;
   		}
   		#right {
   			width: 200px;
   			background: blue;
   			margin-right: -200px;
   		}
   
   		#footer {
   			height: 50px;
   			background: #cccccc;
   		}
       /* 手写clearfix */
   		.clearfix:after {
   			content: '';
   			display: table;
   			clear: both;
   		}
   		.clearfix:after {
   			*zoom: 1; /*兼容IE低版本*/
   		}
   	</style>
   	<body>
   		<div id="header">header</div>
   		<div id="container" class="clearfix">
   			<div id="center" class="column">center</div>
   			<div id="left" class="column">left</div>
   			<div id="right" class="column">right</div>
   		</div>
   		<div id="footer">footer</div>
   	</body>
   </html>
   ```

7. 双飞翼布局

   ```html
   <!DOCTYPE html>
   <html lang="en">
   	<head>
   		<meta charset="UTF-8" />
   		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
   		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
   		<title>双飞翼布局</title>
   	</head>
   	<style>
   		* {
   			padding: 0;
   			margin: 0;
   		}
   		#header {
   			height: 50px;
   			background: #cccccc;
   		}
   		#footer {
   			clear: both;
   			height: 50px;
   			background: #cccccc;
   		}
   		.column {
   			height: 200px;
   			float: left;
   		}
   		#main {
   			width: 100%;
   			background: yellow;
   		}
   		#main-wrap {
   			margin: 0 200px 0 150px;
   		}
   		#left {
   			width: 150px;
   			background: red;
   			margin-left: -100%;
   		}
   		#right {
   			width: 200px;
   			background: blue;
   			margin-left: -200px;
   		}
   	</style>
   	<body>
   		<div id="header">header</div>
   		<div id="main" class="column">
         <div id="main-wrap">center</div>
       </div>
   		<div id="left" class="column">left</div>
   		<div id="right" class="column">right</div>
   		<div id="footer">footer</div>
   	</body>
   </html>
   ```

8. flex 布局

   ```html
   <!DOCTYPE html>
   <html lang="en">
   	<head>
   		<meta charset="UTF-8" />
   		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
   		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
   		<title>flex布局</title>
   	</head>
   	<style>
   		.box {
   			width: 200px;
   			height: 200px;
   			border: 2px solid #cccccc;
   			border-radius: 10px;
   			padding: 20px;
   
   			display: flex;
   			justify-content: space-between;
   		}
   		.item {
   			display: block;
   			width: 50px;
   			height: 50px;
   			border-radius: 50%;
   			background: #666666;
   		}
   
   		.item:nth-child(2) {
   			align-self: center;
   		}
   		.item:nth-child(3) {
   			align-self: flex-end;
   		}
   	</style>
   	<body>
   		<div class="box">
   			<div class="item"></div>
   			<div class="item"></div>
   			<div class="item"></div>
   		</div>
   	</body>
   </html>
   ```

9. 响应式布局-media query

   ```html
   <!DOCTYPE html>
   <html lang="en">
   	<head>
   		<meta charset="UTF-8" />
   		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
   		<meta http-equiv="X-UA-Compatible" content="ie=edge，chrome=1" />
   		<title>响应式布局-media query</title>
   	</head>
   	<style>
   		@media only screen and (max-width: 374px) {
   			/* iphone 5s及以下 */
   			html {
   				font-size: 86px;
   			}
   		}
   		@media only screen and (min-width: 375px) and (max-width: 413px) {
   			/* iphone 6/7/8/x */
   			html {
   				font-size: 100px;
   			}
   		}
   		@media only screen and (min-width: 414px) {
   			/* iphone 6p/7p/8p */
   			html {
   				font-size: 110px;
   			}
   		}
   
   		body {
   			font-size: 0.16rem;
   		}
   		#div1 {
   			width: 1rem;
   			background: #cccccc;
   		}
   	</style>
   	<body>
   		<div id="div1">this is a div</div>
   	</body>
   </html>
   ```

10. flex布局？

    1. [语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
    2. [实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
    
11. 水平居中和垂直居中

    1. 水平居中
       - inline 元素：text-align: center;
       - block 元素：margin: auto;
       - absolute 元素：left 50% + margin-left负值（元素自身宽度一半）
    2. 垂直居中
       - inline 元素：line-height 的值等于 height 值;
       - block 元素：margin: auto;
       - absolute 元素：top 50% + margin-top负值（元素自身高度一半）
       - absolute 元素：trasform: translate(-50%, -50%)
       - absolute 元素：top,right,bottom,left=0 + margin: auto
    
12. Line-height如何继承？

    - 写具体数值，如30px, 则直接继承该数值
    - 写比例，如2/1.5，则继承该比例
    - 写百分比，如200%，则继承计算出来的值（考点）

13. [重绘和回流的异同，如何避免优化？](https://blog.csdn.net/xiao_yu_liu/article/details/102475784)

14. [Vue弹幕效果?](https://blog.csdn.net/qq_31061615/article/details/111036013?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control&dist_request_id=e86ffa55-dc7e-46e7-9d34-ddbb28ff2099&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.control)

15. [浅谈CSS到底会不会阻塞页面渲染](https://www.jb51.net/css/741168.html)