<template>
    <div>
        <p>{{num}}</p>
        <button @click="increment1">+1</button>
        <button @click="increment2(2, $event)">+2</button>

        <hr/>
        <div>
            <a href="javascript:;" @click="openPlays($event)" class="openplays-btn">
                展开
                <br>
                <i class="iconfont"></i>
            </a>
        </div>

    </div>



</template>

<script>
export default {
  data() {
    return {
      num: 0
    };
  },
  methods: {
    increment1(event) {
      // eslint-disable-next-line
      console.log('event', event, event.__proto__.constructor); // 是原生的 event 对象
      // eslint-disable-next-line
      console.log(event.target);
      // eslint-disable-next-line
      console.log(event.currentTarget); // 注意，事件是被注册到当前元素的，和 React 不一样
      this.num++;

      // 1. event 是原生的
      // 2. 事件被挂载到当前元素
      // 和 DOM 事件一样
    },
    increment2(val, event) {
      // eslint-disable-next-line
      console.log(event.target);
      this.num = this.num + val;
    },
    openPlays(event) {
      console.log(event.target); // 事件在哪个元素上触发
      console.log(event.currentTarget); // 事件在哪个元素上绑定

      // 从上面的结果可以看出当使用currentTarget时，不管你点击的是a或者a之中的任何元素，其获取到的对象都为绑定事件的a；
      //当使用target时，如果你点击到a元素则传a元素，如果点击到a之中的某个子级元素则传a之中的某个元素。
    },
    loadHandler() {
      // do some thing
    }
  },
  mounted() {
    window.addEventListener('load', this.loadHandler);
  },
  beforeDestroy() {
    //【注意】用 vue 绑定的事件，组建销毁时会自动被解绑
    // 自己绑定的事件，需要自己销毁！！！
    window.removeEventListener('load', this.loadHandler);
  }
};
</script>