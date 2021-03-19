1. Js创建10个 <a> 标签，点击弹出相应的序号

```javascript
//创建文档片段 ，一次性插入dom节点提高性能
var fraNode = document.createDocumentFragment();

//let创建块级作用域
for (let i = 0; i < 10; i++) {
  var aNode = document.createElement('a');
  aNode.innerHTML = i;
  aNode.style.cssText = "display:block;margin-bottom:10px;background-color:#ccc;";
  fraNode.appendChild(aNode);
}

var divNode = document.createElement('div');
divNode.id = 'app';
divNode.appendChild(fra);
document.body.appendChild(divNode);

//事件代理
divNode.onclick = function(e) {
  var tar = e.target;
  console.dir(e);
  if (tar.nodeName === 'A') {
    console.log(tar.innerHTML);
  }
};
```

2. 宏任务和微任务的区别？

> 1. 微任务是在DOM渲染前执行；宏任务是在DOM渲染完成后执行。

![image-20210228121858547](https://cdn.jsdelivr.net/gh/haoleir/file@master/images/image-20210228121858547-2021%2002%2028%2012%2018%20.png)


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>test</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  </head>

  <body>
    <div id="app"></div>
    <script>
      $('#app')
        .append('<p>Hello world!</p>')
        .append('<p>Hello world!</p>')
        .append('<p>Hello world!</p>');
      // console.log('length', $('#app').children().length);
      // alert('本次 call stack 结束，DOM结构已更新，但是未触发渲染');

      setTimeout(() => {
        console.log('length2', $('#app').children().length);
        alert('setTimeout 执行，DOM渲染了吗？');
      }, 0);

      Promise.resolve().then(() => {
        console.log('length1', $('#app').children().length);
        alert('promise.then 执行，DOM渲染了吗？');
      });
    </script>
  </body>
</html>
```

3. 手写 Promise 的 all 方法

```javascript
function PromiseAll(promiseArr) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArr)) {
      reject(new Error('传入的参数必须是数组！'));
    }
    const res = [];
    const promiseNum = promiseArr.length;
    let counter = 0;
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promiseArr[i])
        .then(val => {
          counter++;
          res[i] = val;
          if (counter === promiseNum) {
            resolve(res);
          }
        })
        .catch(e => reject(e));
    }
  });
}

//测试
const pro1 = new Promise((res, reject) => {
  setTimeout(() => {
    res('2');
  }, 1000);
});
const pro2 = new Promise((res, reject) => {
  setTimeout(() => {
    res('1');
  }, 1000);
});
const pro3 = new Promise((res, reject) => {
  setTimeout(() => {
    res('3');
  }, 1000);
});

const proAll = PromiseAll([pro1, pro2, pro3])
  .then(res => {
    console.log(res);
  })
  .catch(e => {
    console.log(e);
  });
```

   