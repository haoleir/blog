import Vue from 'vue';

const vm = new Vue({
  el: '#app',
  data() {
    return {
      msg: 'Hello',
      school: { name: 'zf', age: 10 },
      arr: [[1], 2, 3],
      firstName: 'feng',
      lastName: 'zhu'
    };
  },
  computed: {
    fullName() {
      return this.firstName + this.lastName;
    }
  },
  watch: {
    // msg: {
    //   handler(newValue, oldValue) {
    //     console.log(newValue, oldValue);
    //   },
    //   immediate: true
    // }
  }
});

setTimeout(() => {
  // vm.msg = 'World';
  // vm.msg = 'aaa';
  // vm.msg = 'bbb';
  // vm.msg = 'xxx'; //最终拿到 vm.msg = 'xxx' 来更新视图就好
  // vm.school.name = 'px';
  //----------数组更新 更新数组中的对象属性是可以的 因为我们拦截了数组中对象属性的get set
  // vm.arr[0].a = 100;
  // vm.arr[0].push(100); //数组的依赖收集

  // console.log('vm:', vm);
  //vue的特点是批量更新 防止重复渲染

  // --------watch的使用
  // vm.msg = 'world';

  //--------更改计算属性
  vm.firstName = 'jiang';
}, 1000);

// console.log(vm.arr.push(4), vm.arr);
// console.log(vm.arr.push({ a: 111 }), vm.arr[3].a);
// console.log((vm.arr[0].a = 100));
