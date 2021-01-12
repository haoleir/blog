// class Parent {
// 	constructor() {
// 		this.name = 'parent';
// 	}
// 	static b() {
// 		return 2;
// 	}
// 	eat() {
// 		console.log('eat');
// 	}
// }

// let p = new Parent();
// console.log(p);

/* =============== 类的编译 =================== */

/**
 * 类的调用检测 检测实例是不是new出来的
 *
 * @param {*} instance 实例
 * @param {*} constructor 构造函数
 */
function _classCallCheck(instance, constructor) {
	if (!(instance instanceof constructor)) {
		throw new Error('Class constructor cannot be invoked without new');
	}
}

function definePropertypes(target, arr) {
	for (let i = 0; i < arr.length; i++) {
		let { key, value } = arr[i];
		Object.defineProperty(target, key, {
			value,
			configurable: true,
			configurable: true,
			enumerable: true
		});
	}
}

/**
 *
 * @param {*} constructor 是构造函数
 * @param {*} protoPropertypes 是原型方法的描述
 * @param {*} staticPropertypes 是静态方法的描述
 */
function _createClass(constructor, protoPropertypes, staticPropertypes) {
	if (protoPropertypes.length > 0) {
		definePropertypes(constructor.prototype, protoPropertypes);
	}
	if (staticPropertypes.length > 0) {
		definePropertypes(constructor, staticPropertypes);
	}
}

let Parent = (function() {
	//写自己的逻辑
	function P() {
		_classCallCheck(this, P);
		this.name = 'parent';
	}
  //属性描述器
	_createClass(
		P,
		[
			{
				key: 'eat',
				value: function() {
					console.log('eat');
				}
			}
		],
		[
			{
				key: 'b',
				value: function() {
					return 2;
				}
			}
		]
	);
	return P;
})();

let p = new Parent(); //TypeError: Class constructor XXX cannot be invoked without 'new'
console.log(p.name);
p.eat();
console.log(Parent.b());
