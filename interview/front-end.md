### 1.nodejs如何避免回调地狱

```javascript
/**
 * 1.promise
 * 2.async await
 * 3.模块化：将回调函数分割为独立的函数
 */

var fs = require('fs');
var promisify = require('util').promisify;
var read = promisify(fs.readFile);

read('./doc/text/rss_feeds.txt')
	.then(function(data) {
		console.log(data.toString());
	})
	.catch(function(err) {
		console.log(err);
	});


async function test() {
	try {
		var data = await read('./doc/text/rss_feeds.txt');
		console.log(data.toString());
	} catch (err) {
		console.log(err);
	}
}
test()
```

