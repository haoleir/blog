### node面试题

​	

1. 解析用户输入的终端命令参数?

   ```javascript
   let config = process.argv.slice(2).reduce((memo, cur, idx, arr) => {
     if (cur.includes('--')) {
       memo[cur.slice(2)] = arr[idx + 1];
     }
     return memo;
   }, {});
   
   console.log('config: ', config);
   
   ```

   

