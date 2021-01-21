
<template>
    <div>
        <h2>{{msg}}</h2><hr/>
        <h3>{{$store.state}}--{{count}}</h3>
        <!-- 模块组 -->
        <h3>{{count}}</h3>
 
        <div>
            <h5>同步操作</h5>
            <button @click="$store.commit('add',1)">+1</button>
            <button @click="reduce(1)">-1</button>
        </div>
        <div>
            <h5>异步操作</h5>
            <button @click="addAction(10)">+10</button>
            <button @click="reduceAction(10)">-10</button>
        </div>
    </div>
</template>
 
<script>
import store from '@/vuex/store';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  store,
  data() {
    return {
      msg: 'hello Vuex'
    };
  },
  //第一种
  /*
    computed:{ 
        count(){
            return  this.$store.state.count
        }
    }
    */
  //第二种
  /*
    computed:mapState({
        count:state=>state.count,
    })
    */
  //第三种
  computed: {
    ...mapState(['count']),
    ...mapGetters(['count']),

    //模块组
    count() {
      return this.$store.state.a.count;
    }
  },
  methods: {
    ...mapMutations(['add', 'reduce']),
    ...mapActions(['addAction', 'reduceAction'])
  }
};
</script>