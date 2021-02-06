// vue源码中封装的looseEqual()方法：
// 判断A、B两个集合是否相等，如果A包含于B，且B包含于A，则 A = B
/**判断两个对象相等 （判断两个对象键名与键值对应相同 而非指引用地址相同）
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
	if (a === b) {
		return true;
	} //参数a和参数b恒等于返回true；
	var isObjectA = isObject(a);
	var isObjectB = isObject(b);
	if (isObjectA && isObjectB) {
		//如果a,b不为空，同时是对象
		try {
			var isArrayA = Array.isArray(a);
			var isArrayB = Array.isArray(b);
			if (isArrayA && isArrayB) {
				// 当a,b是数组时，首先判断length长度是否相同，不相同时可以结束比较
				return (
					a.length === b.length &&
					a.every(function(e, i) {
						//array.every(function(currentValue,index,arr), thisValue)
						return looseEqual(e, b[i]); //递归判断两个数组中的每一项
					})
				);
			} else if (a instanceof Date && b instanceof Date) {
				return a.getTime() === b.getTime();
				//单独处理 Date 类型, 时间戳应该是一样的。如果需要考虑其它类型, 继续添加else if 即可
			} else if (!isArrayA && !isArrayB) {
				// 当a,b是对象时，首先判断length长度是否相同，长度相同再判断每个属性对应的属于值是否相同
				var keysA = Object.keys(a);
				var keysB = Object.keys(b);
				return (
					keysA.length === keysB.length &&
					keysA.every(function(key) {
						return looseEqual(a[key], b[key]); //递归判断两个对象中的每一个属性
					})
				);
			} else {
				/* istanbul ignore next */
				return false;
			}
		} catch (e) {
			/* istanbul ignore next */
			return false;
		}
	} else if (!isObjectA && !isObjectB) {
		return String(a) === String(b);
	} else {
		return false;
	}
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
	return obj !== null && typeof obj === 'object';
}
