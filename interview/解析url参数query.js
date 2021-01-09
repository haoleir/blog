// //1. 传统方式
// function query(name) {
//     const search = location.search.substr(1) // 类似 array.slice(1)
//     // search: 'a=10&b=20&c=30'
//     const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
//     const res = search.match(reg)
//     if (res === null) {
//         return null
//     }
//     return res[2]
// }
// query('d')

// 2.URLSearchParams
// function query(name) {
//     const search = location.search
//     const p = new URLSearchParams(search)
//     return p.get(name)
// }
// console.log( query('b') )

// 3.正则
// function queryUrlParams(url) {
// 	let result = {},
// 		reg1 = /([^?&=#]+)=([^?&=#]*)/g,
// 		reg2 = /#([^?&=#]+)/g;

// 	url.replace(reg1, (n, x, y) => (result[x] = y));
// 	url.replace(reg2, (n, x) => (result['HASH'] = x));
// 	return result;
// }

function queryUrlParams(url) {
	//获取 ？和 # 后面的信息
	let askIdx = url.indexOf('?'),
		wellIdx = url.indexOf('#'),
		askText = '',
		wellText = '';
	// # 不存在
	wellIdx === -1 ? (wellIdx = url.length) : null;
	// ？ 不存在
	askIdx >= 0 ? (askText = url.substring(askIdx + 1, wellIdx)) : null;
	wellText = url.substring(wellIdx + 1);

	//获取每一部分信息
	let result = {};
	wellText !== '' ? (result['HASH'] = wellText) : null;
	if (askText !== '') {
		let arr = askText.split('&');
		arr.forEach(item => {
			let itemArr = item.split('=');
			result[itemArr[0]] = itemArr[1];
		});
	}
	return result;
}

var str = 'http://www.zhufengpeixun.cn/stu/?lx=1&name=&sex=#teacher';

let paramsObj = queryUrlParams(str);
console.log(paramsObj);
