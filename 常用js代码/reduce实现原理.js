//手动实现数组的 reduce 方法
Array.prototype.myReduce = function(fn, prev) {
	for (let i = 0; i < this.length; i++) {
		if (typeof prev === 'undefined') {
			prev = fn(this[i], this[i + 1], i + 1, this);
			++i;
		} else {
			prev = fn(prev, this[i], i, this);
		}
	}
	return prev;
};

let total = [1, 2, 3, 4, 5].myReduce((prev, next, currIndex, arr) => {
	console.log(prev, next, currIndex, arr);
	return prev + next;
});

// let total = [1, 2, 3, 4, 5].reduce((prev, next, currIndex, arr) => {
// 	console.log(prev, next, currIndex, arr);
// 	return prev + next;
// });

console.log(total);