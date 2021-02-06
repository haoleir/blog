const path = require('path');
let ncp = require('ncp');
const util = require('util');

// ncp = util.promisify(ncp);

// 手写实现promisify方法
const promisify = fn => (...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, function(err) {
      if (err) reject(err);
      resolve();
    });
  });
};

ncp = promisify(ncp);

(async () => {
  await ncp(path.resolve(__dirname, 'test.js'), path.resolve(__dirname, 'test1.js'));
  console.log('拷贝成功');
})();

// ncp(path.resolve(__dirname, 'test.js'), path.resolve(__dirname, 'test1.js'), err => {
//   console.log(err);
// });
