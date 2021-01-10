//1.如何实现一个类模版字符串功能
/* let name = '珠峰培训';
let age = 10;

let str = 'hello~${name}今年${age}岁了';
str = str.replace(/\$\{([^}]*)\}/g, function() {
  return eval(arguments[1]);
});

console.log(str); */

//2.自定义标签-模版字符串
let name = '珠峰培训';
let age = 10;

function jw() {
	let str = '';
	let strings = arguments[0];
	let values = [].slice.call(arguments, 1);
	for (let i = 0; i < values.length; i++) {
		str += `${strings[i]}【${values[i]}】`;
	}
	str += strings[strings.length - 1];
	return str;
}

let str = jw`hello~${name}今年${age}岁了`;

console.log(str);
