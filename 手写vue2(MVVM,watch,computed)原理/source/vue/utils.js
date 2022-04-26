// ?: 匹配不捕获 不捕获当前的分组
// +  至少一个
// ？ 尽可能少匹配
const defaultReE = /\{\{((?:.|\r?\n)+?)\}\}/g;
export const utils = {
  getValue(vm, expr) {
    let keys = expr.split('.');

    // vm.school.name;
    return keys.reduce((memo, current) => {
      memo = memo[current];
      return memo;
    }, vm);
  },
  compilerText(node, vm) {
    if (!node.expr) {
      node.expr = node.textContent;
    }
    node.textContent = node.expr.replace(
      defaultReE,
      function (...args) {
        return JSON.stringify(utils.getValue(vm, args[1]));
      },
      vm
    );
  }
};

export function compiler(node, vm) {
  let childNodes = node.childNodes;

  [...childNodes].forEach((child) => {
    //1元素 3文本
    if (child.nodeType == 1) {
      //编译当前元素的孩子节点
      compiler(child, vm);
    } else if (child.nodeType == 3) {
      utils.compilerText(child, vm);
    }
  });
}
