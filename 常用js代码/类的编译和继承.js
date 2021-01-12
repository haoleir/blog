// class Parent {
// 	constructor() {
// 		this.name = 'parent';
//    //return {}
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

// class Child extends Parent {
// 	constructor() {
// 		super();
// 		this.age = 9;
//   }
//   smoking(){
//     console.log('smoking')
//   }
// }

// let child = new Child();
// console.log(child);

//1.类只能new
//2.类可以继承公有私有和静态方法
//3.父类的构造函数中返回了一个引用类型，子类会把这个引用类型作为子类的this



/* =============== 1.类的编译 =================== */

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
		return {};
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

// let p = new Parent(); //TypeError: Class constructor XXX cannot be invoked without 'new'
// console.log(p.name);
// p.eat();
// console.log(Parent.b());

/* =============== 2.类的继承 =================== */

function _inherits(subClass, superClass) {
	// 继承父类的共有属性
	subClass.prototype = Object.create(superClass.prototype, { constructor: { value: subClass } });
	// 继承父类的静态方法
	Object.setPrototypeOf(subClass, superClass);
}
let Child = (function(Parent) {
	//先实现继承父类的公有属性和静态方法
	_inherits(C, Parent);
	function C() {
		_classCallCheck(this, C);
		let obj = Parent.call(this);
		let that = this;
		if (typeof obj === 'object') {
			that = obj;
		}
		that.age = 9; // 解决了父类返回引用类型的问题
		return that;
	}
	return C;
})(Parent);

let child = new Child();
console.log(child);
console.log(Child.b());
