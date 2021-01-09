//时间字符串格式化

String.prototype.formatTime = function(template) {
	typeof template === 'undefined' ? (template = '{0}年{1}月{2}日 {3}:{4}:{5}') : null;

	let matchAry = this.match(/\d+/g);

	template = template.replace(/\{(\d+)\}/g, (x, y) => {
		let val = matchAry[y] || '00';
		val.length < 2 ? (val = '0' + val) : null;
		return val;
	});
	return template;
};

let time = '2020-05-30 19:0:0';
console.log(time.formatTime('{0}-{1}-{2} {3}:{4}'));
