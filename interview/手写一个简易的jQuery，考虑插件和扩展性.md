### 手写一个简易的jQuery，考虑插件和扩展性

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>手写简易jquery</title>
    <style>
    </style>
  </head>

  <body>
    <p>一段文字1</p>
    <p>一段文字2</p>
    <p>一段文字3</p>

    <script type="text/javascript" src="./test.js"></script>
  </body>
</html>
```



```javascript
class JQuery {
	constructor(selector) {
		const result = document.querySelectorAll(selector);
		const length = result.length;
		for (let i = 0; i < length; i++) {
			this[i] = result[i];
		}
    this.length = length;
    this.selector = selector
	}
	get(index) {
		return this[index];
	}
	each(fn) {
		for (let i = 0; i < this.length; i++) {
			const elem = this[i];
			fn(elem);
		}
	}
	on(type, fn) {
		return this.each(function(elem) {
			elem.addEventListener(type, fn, false);
		});
  }
  //还可以扩展很多DOM操作的API
}

// 插件
/* jQuery.prototype.dialog = function(info) {
	alert(info);
}; */
//...扩展更多的方法

//“造轮子”
class MyJQuery extends JQuery {
	constructor(selector) {
		super(selector);
	}
	//...扩展自己的方法
	addClass(classname){
    // console.log(classname)
    for(let i=0; i < this.length ; i++){
      const elem = this[i]
      elem.className += ` ${classname}` 
      // console.log(elem)
    }
  }
	style(data) {}
}

const $p = new JQuery('p');
console.log($p);
console.log($p.get(1));

$p.each(elem => {
	console.log(elem.nodeName, elem.innerHTML);
});

$p.on('click', e => {
	console.log(e.target.innerHTML);
});

const $p1 = new MyJQuery('p');
$p1.addClass('p2')
```

