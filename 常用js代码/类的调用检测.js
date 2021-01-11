//类的调用检测 检测实例是不是new出来的

function _classCallCheck(instance, constructor) {
	if (!(instance instanceof constructor)) {
		throw new Error('Class constructor cannot be invoked without new');
	}
}

let Parent = (function() {
	//写自己的逻辑
	function P() {
		_classCallCheck(this, P);
	}
	return P;
})();

let p = Parent(); // Error: Class constructor cannot be invoked without new
