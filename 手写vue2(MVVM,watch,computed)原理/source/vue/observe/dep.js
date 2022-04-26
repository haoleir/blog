let id = 0;

class Dep {
  constructor() {
    this.id = id++;
    this.subs = [];
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
  notify() {
    this.subs.forEach((watcher) => {
      watcher.update();
    });
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
}

let stack = [];

export function pushTarget(watcher) {
  Dep.target = watcher;
  stack.push(watcher);
}

export function popTarget() {
  stack.pop();
  Dep.target = stack[stack.length - 1];
}

export default Dep; //用来收集依赖 收集的是一个个watcher
