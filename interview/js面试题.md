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

4. 请你分析一下，promise，generator，async 三者之间的关系？

```javascript
/*
promise 是一个类函数。当它执行完毕后，会开启异步任务，这个异步任务还得看 promise 本身的状态。通俗来说，它的异步任务就是 then 中的回调函数。promise 诞生的目的不是为了开启异步任务，而是为了解决异步代码的书写格式，尽量实现函数回调的扁平化，所以我们需要把异步代码写在 promise 中进行封装。

对于这三者之间的联系，其实很好理解。我们可以认为它们是每一次版本升级的产物。

也就是说，generator 其实是 promise 的升级版，但它的逻辑和理解却要比 promise 复杂。因此，程序员们在上面要花费一些学习成本，所以我个人不推荐大家使用generator。

而 async 是 generator 的升级版，外界都称它为 generator 的语法糖，那就意味着 async 就是一个小甜点，人人喜欢，因为它简单易懂还好用，顺理成章成为开发者们解决异步方案的不二之选！

*/

//下面有个计时器任务，请用这三种方法依次解决它代码中出现回调地狱的问题。
et t = setTimeout(()=>{
  console.log(1111)
     let t1 = setTimeout(()=>{
         console.log(2222)
         let t2 = setTimeout(()=>{
             console.log(3333)
         },3000)
     },2000)
 },1000);

//1. promise解法
let promiseFn = function(data, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data);
      resolve();
    }, delay);
  });
};

promiseFn(1111, 1000)
  .then(data => {
    return promiseFn(2222, 2000);
  })
  .then(data => {
    return promiseFn(3333, 3000);
  }).catch(err => {console.log(err)});

//2. generator解法
let timer = function(data, delay) {
  setTimeout(() => {
    console.log(data);
  }, delay);
};

let generatorFn = (function*() {
  yield timer(1111, 1000);
  yield timer(2222, 2000);
  yield timer(3333, 3000);
})();

generatorFn.next();
generatorFn.next();
generatorFn.next();

//2. async解法
let timer = function(data, delay) {
  setTimeout(() => {
    console.log(data);
  }, delay);
};

let asyncFn = async function() {
  await timer(1111, 1000);
  await timer(2222, 2000);
  await timer(3333, 3000);
};

asyncFn();
```

5. 怎么用promise封装原生ajax请求？

```javascript
const queryUrl = 'https://www.baidu.com/sugrec?from=pc_web&wd=' + '平安';

// 1.原生ajax
function ajax(url, success, fail) {
  var client = new XMLHttpRequest();
  client.open('GET', url);
  client.onreadystatechange = function() {
    if (this.readyState !== 4) {
      return;
    }
    if (this.status === 200) {
      success(this.response);
    } else {
      fail(new Error(this.statusText));
    }
  };
  client.send();
}

ajax(
  queryUrl,
  function(data) {
    console.log(data);
  },
  function(err) {
    console.log(err);
  }
);

// 2.promise封装ajax
function promiseAjax(url) {
  return new Promise((resolve, reject) => {
    var client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    client.send();
  });
}

promiseAjax(queryUrl)
  .catch(function(err) {
    console.log(err);
  })
  .then(function(data) {
    console.log(data);
  });
```

6. 如何实现Promise 并行或者串行执行？

```javascript
function sleep(time = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('promise resolved');
      resolve();
    }, time * 1000);
  });
}

const promiseCreatorList = [sleep, sleep, sleep];

// 1.promise.all (promise并行执行)
console.log('promise.all start', new Date().getTime());
Promise.all(promiseCreatorList.map(item => item())).then(() => {
  console.log('promise.all end', new Date().getTime());
});

// 2.for of async (promise串行执行)
async function main() {
  console.log('for of async start', new Date().getTime());
  async function forOfLoop() {
    for (const promiseInstance of promiseCreatorList) {
      await promiseInstance();
    }
  }
  await forOfLoop();
  console.log('for of async end', new Date().getTime());
}
main();

//3.promise链式调用 (promise串行执行)
const promiseChain = promiseCreatorList.reduce((mem, cur, index, arr) => {
  return mem.then(cur);
}, Promise.resolve());
```

