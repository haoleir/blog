# Nodejs实战



### 1. subtitle

```javascript
var http = require('http');

var server = http.createServer();
server.on('request', function(req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Hello world\n');
});

server.listen(3000);
console.log('Server is running at http://localhost:3000/');
```



~~~javascript
const fs = require('fs');
const stream = fs.createReadStream('./package.json', { encoding: 'utf-8' });

stream.on('data', function(chunk) {
	console.log(chunk);
});

stream.on('end', function() {
	console.log('finished');
});
~~~



```javascript
const http = require('http');
const fs = require('fs');

var server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
	fs.createReadStream('./package.json', { encoding: 'utf-8' }).pipe(res);
});

server.listen(3000);
console.log('Server is running at http://localhost:3000/');
```



```javascript
const http = require('http');
const fs = require('fs');

var server = http.createServer(function(req, res) {
	if (req.url === '/') {
		getTitles(res);
	}
});

server.listen(3000);
console.log('Server is running at http://localhost:3000/');

function getTitles(res) {
	fs.readFile('./titles.json', function(err, data) {
		if (err) return hadError(err, res);
		var titles = JSON.parse(data.toString());
		getTemplate(titles, res);
	});
}

function getTemplate(titles, res) {
	fs.readFile('./index.html', function(err, data) {
		if (err) return hadError(err, res);
		var tmpl = data.toString();
		formatHtml(titles, tmpl, res);
	});
}
function formatHtml(titles, tmpl, res) {
	var html = tmpl.replace('%', titles.join('</li><li>'));
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end(html);
}

function hadError(err, res) {
	console.error(err);
	res.end('server error!');
}
```



~~~javascript
const net = require('net');

var server = net.createServer(function(socket) {
	socket.on('data', function(data) {
    console.log('data: ', data.toString());
		socket.write(data);
	});
});
server.listen(3000);

//控制台输入 telnet 127.0.0.1 3000
~~~



### 串行流程控制

```javascript
/**
	* rss订阅源
	* rss_feeds.txt：
	* https://www.zhihu.com/rss
	* https://pansci.asia/feed
*/

var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFileName = './doc/text/rss_feeds.txt';

function checkForRSSFile() {
	fs.exists(configFileName, function(exists) {
		if (!exists) {
			return next(new Error('Miss RSS File:' + configFileName));
		}
		next(null, configFileName);
	});
}

function readRSSFile(configFileName) {
	fs.readFile(configFileName, function(err, feedList) {
		if (err) {
			return next(err);
		}
		feedList = feedList
			.toString()
			.replace(/^\s+|\s+$/g, '')
			.split('\n');
		var random = Math.floor(Math.random() * feedList.length);
    console.log('feedList[random]: ', feedList[random]);
    next(null, feedList[random]);
	});
}

function downloadRSSFeed(feedUrl) {
	request({ uri: feedUrl }, function(err, res, body) {
		if (err) {
			return next(err);
		}
		if (res.statusCode != 200) {
			return next(new Error('Abnormal response status code!'));
		}
		next(null,body);
	});
}

function parseRSSFeed(rss) {
	var handler = new htmlparser.RssHandler();
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(rss);
	if (!handler.dom.items.length) {
		return next(new Error('No RSS item found'));
	}
	var item = handler.dom.items.shift();
	console.log(item.title);
	console.log(item.link);
}

var tasks = [checkForRSSFile, readRSSFile, downloadRSSFeed, parseRSSFeed];

function next(err, result) {
	if (err) {
		throw err;
	}
	var currentTask = tasks.shift();
	if (currentTask) {
		currentTask(result);
	}
}

next();
```





### 并行流程控制

~~~javascript
const EventEmitter = require('events').EventEmitter

const channel=new EventEmitter()

channel.on('join',function(data){
  console.log("welcome",data)
})

channel.emit('join',123)
~~~



~~~javascript
var fs = require('fs');
var completedTasks = 0;
var tasks = [];
var wordCounts = {};
var filesDir = './doc/text';

function checkIfComplete() {
	completedTasks++;
	if (completedTasks === tasks.length) {
		for (var index in wordCounts) {
			console.log(index + ': ' + wordCounts[index]);
		}
	}
}

function countWordInText(text) {
	var words = text
		.toString()
		.toLowerCase()
		.split(/\W+/)
		.sort();
	for (var index in words) {
		var word = words[index];
		if (word) {
			wordCounts[word] = wordCounts[word] ? wordCounts[word]+1 : 1;
		}
	}
}

fs.readdir(filesDir, function(err, files) {
	if (err) {
		throw err;
	}
	for (var index in files) {
		var task = (function(fileDir) {
			return function() {
				fs.readFile(fileDir, function(err, text) {
					if (err) {
						throw err;
					}
					countWordInText(text);
					checkIfComplete();
				});
			};
		})(filesDir + '/' + files[index]);
		tasks.push(task);
	}
	for (var index in tasks) {
		tasks[index]();
	}
});
~~~



### connect

```javascript
const connect = require('connect');

const app = connect();

function logger(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
}

function hello(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hello world');
}

app
	.use(logger)
	.use(hello)
	.listen(3000);
```

