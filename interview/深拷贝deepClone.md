### 深拷贝deepClone.js

```javascript
// 简易版.js
/* function deepClone(obj) {
	if (typeof obj !== 'object' || obj == null) {
		return obj;
	}
	const target = Array.isArray(obj) ? [] : {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
      target[key] = deepClone(obj[key]);
		}
	}
  return target;
} */

// 测试
// const simple = {
// 	s: '',
// 	sym: Symbol(),
// 	obj: {
// 		bool: false,
// 		n: null
// 	},
// 	array: [
// 		{
// 			nan: NaN,
// 			i: Infinity,
// 			sym: Symbol()
// 		},
// 		123
// 	]
// };
// let a1 = deepClone(simple);
// console.log(simple);
// console.log(a1);

// 完整版
function deepClone(target, cache = new Map()) {
	if (cache.get(target)) {
		return cache.get(target);
	}
	if (target instanceof Object) {
		let dist;
		if (target instanceof Array) {
			dist = [];
		} else if (target instanceof Function) {
			const fn = function() {
				return target.call(this, ...arguments);
			};
			fn.name = target.name;
			dist = fn;
		} else if (target instanceof RegExp) {
			dist = new RegExp(target.source, target.flags);
		} else if (target instanceof Date) {
			dist = new Date(target);
		} else {
			dist = {};
		}
		cache.set(target, dist);

		for (const key in target) {
			if (target.hasOwnProperty(key)) {
				dist[key] = deepClone(target[key], cache);
			}
		}
		return dist;
	} else {
		return target;
	}
}

// const a = {
// 	i: Infinity,
// 	s: '',
// 	bool: false,
// 	n: null,
// 	u: undefined,
// 	sym: Symbol(),
// 	obj: {
// 		i: Infinity,
// 		s: '',
// 		bool: false,
// 		n: null,
// 		u: undefined,
// 		sym: Symbol()
// 	},
// 	array: [
// 		{
// 			nan: NaN,
// 			i: Infinity,
// 			s: '',
// 			bool: false,
// 			n: null,
// 			u: undefined,
// 			sym: Symbol()
// 		},
// 		123
// 	],
// 	fn: function() {
// 		return 'fn';
// 	},
// 	date: new Date(),
// 	re: /hi\d/gi
// };
// let a2 = deepClone(a);
// console.log(a);
// console.log(a2);
// console.log(a2 !== a);
// console.log(a2.i === a.i);
// console.log(a2.s === a.s);
// console.log(a2.bool === a.bool);
// console.log(a2.n === a.n);
// console.log(a2.u === a.u);
// console.log(a2.sym === a.sym);
// console.log(a2.obj !== a.obj);
// console.log(a2.array !== a.array);
// console.log(a2.array[0] !== a.array[0]);
// console.log(a2.array[0].i === a.array[0].i);
// console.log(a2.array[0].s === a.array[0].s);
// console.log(a2.array[0].bool === a.array[0].bool);
// console.log(a2.array[0].n === a.array[0].n);
// console.log(a2.array[0].u === a.array[0].u);
// console.log(a2.array[0].sym === a.array[0].sym);
// console.log(a2.array[1] === a.array[1]);
// console.log(a2.fn !== a.fn);
// console.log(a2.date !== a.date);
// console.log(a2.re !== a.re);
```

