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

