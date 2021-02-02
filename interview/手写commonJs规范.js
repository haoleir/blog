const path = require('path');
const fs = require('fs');
const vm = require('vm');

// node 中每一个文件都是模块 Module类
function Module(id) {
  this.id = id;
  this.exports = {};
}

Module.wrapper = ['(function(module,exports,require,__filename,__dirname){', '})'];

Module.extensions = {
  '.js'(module) {
    let script = fs.readFileSync(module.id, 'utf-8');
    let fnStr = Module.wrapper[0] + script + Module.wrapper[1];
    let fn = vm.runInThisContext(fnStr);
    fn.call(module.exports, module, module.exports, req, module.id, path.dirname(module.id));
  },
  '.json'(module) {
    let script = fs.readFileSync(module.id, 'utf-8');
    module.exports = JSON.parse(script);
  }
};

//给你一个相对路径 解析成绝对路径

Module.resolveFileName = function(fileName) {
  let absPath = path.resolve(__dirname, fileName); //绝对路径
  let flag = fs.existsSync(absPath);
  let current = absPath;
  if (!flag) {
    let keys = Object.keys(Module.extensions);
    for (let i = 0; i < keys.length; i++) {
      current = absPath + keys[i];
      flag = fs.existsSync(current);
      if (flag) {
        break;
      } else {
        current = null;
      }
    }
    if (!current) {
      throw new Error('文件不存在！');
    }
  }
  return current;
};

Module.prototype.load = function() {
  //模块加载就是读取文件内容
  let ext = path.extname(this.id); //取扩展名
  Module.extensions[ext](this);
};

Module._cache = {};
/**
 * 手写实现require方法
 * @param {*} fileName 文件相对路径
 */
function req(fileName) {
  let current = Module.resolveFileName(fileName);
  if (Module._cache[current]) {
    return Module._cache[current].exports; //如果加载过了 那模块肯定缓存好了，直接将 exports 返回即可
  }
  let module = new Module(current); //产生一个module
  Module._cache[current] = module;
  module.load();
  return module.exports; //默认导出module.exports对象
}

const json = req('./index');
// const json = require('./index');
console.log(json);

/**
 * 
 * 1.手写commonJs规范
 * 1.解析出绝对路径current；
 * 2.判断有没有缓存 Module._cache
 * 3.new出来一个Module实例，并以绝对路径为缓存id，放入缓存；
 * 4.模块加载过程：根据不同后缀名，
 *    1. json直接读出来，转成对象并赋值给module.exports返回;
 *    2. js文件，将文件内容读出来放入到一个匿名函数中，执行匿名函数并将结果赋值给module.exports返回（核心思想就是创建一个空对象，给用户填内容，用户填完内容后返回）
 */

 /**
  * 2.node内置有三种模块：
  *   1.文件模块（如果存在同名，先读文件，再读文件夹）
  *   2.第三方模块（从当前所在文件夹里。一层一层往上查找node_modules文件夹里，有没指定的文件夹，直到项目根目录找不到，返回报错为止。在package.json里main字段指定文件读取的主入口，如果没有指定，默认入口是index.js；）；
  *   3.内置模块（直接引用）
  */

  /**
   * exports / module.exports 都是用来暴露模块，两个有什么不同？
      在node中，每个js文件都有 module.exports这个对象，为了方便，相当于在模块头部加了这句话： var exports = module.exports；
      不同之处：

      export不能重新赋值, 不然会切换与module.exports的联系，因为其存的是module.exports对象的指针
      最终暴露出去的对象是module.exports

      什么时候用exports，什么时候用module.exports？
      构造函数的情况可以使用module.exports
   */
