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
// ~(function() {
//   /**
//    * queryURLParams: 获取URL地址问号后面的参数信息（可能包含HASH值）
//    *  @params
//    *  @return
//    *    [object] 把所有问号参数信息以键值对的方式存储起来并返回
//    * by zhufengpeixun on 2021/01/17
//    */
//   function queryURLParams() {
//     let obj = {};
//     this.replace(/([^?=&#]+)=([^?=&#]+)/g, (...[, $1, $2]) => (obj[$1] = $2));
//     this.replace(/#([^?=&#]+)/g, (...[, $1]) => (obj['HASH'] = $1));
//     return obj;
//   }
//   /*扩展到String。prototype上 */
//   ['queryURLParams'].forEach(item => {
//     String.prototype[item] = eval(item);
//   });
// })();

// let url = 'http://www.zhufengpeixun.com/?lx=1&from=wx#video';
// console.log(url.queryURLParams()); //=> {lx: "1", from: "wx", HASH: "video"}

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
