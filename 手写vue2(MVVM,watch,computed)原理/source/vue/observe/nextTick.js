let callbacks = [];
function flushCallbacks() {
  callbacks.forEach((cb) => cb());
}
export function nextTick(cb) {
  callbacks.push(cb);

  //要异步刷新这个callbacks，需要获取一个异步方法
  //异步分执行顺序 依次微任务(promise mutationObserver) 宏任务(setImmediate setTimeout)

  let timerFunc = () => {
    flushCallbacks();
  };
  if (Promise) {
    return Promise.resolve().then(timerFunc);
  }
  if (MutationObserver) {
    let observe = new MutationObserver(timerFunc);
    let textNode = document.createTextNode(1);
    observe.observe(textNode, { characterData: true });
    textNode.textContent = 2;
    return;
  }
  if (setImmediate) {
    return setImmediate(timerFunc);
  }
  setTimeout(timerFunc, 0);
}
