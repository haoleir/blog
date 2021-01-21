//数据仓库
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//共享值就是状态
//mapState

const state = {
  count: 1
};

//改变状态对象的方法
//Mutations
const mutations = {
  add(state, n) {
    debugger;
    state.count += n;
  },
  reduce(state, n) {
    debugger;
    state.count -= n;
  }
};
//mapGetters
//mapActions
const getters = {
  count: function(state, n) {
    debugger;
    return (state.count += n);
  }
  //count:state=>state.count+=100,
};
//异步
const actions = {
  addAction(context, n) {
    debugger;
    context.commit('add', n);
    setTimeout(() => {
      context.commit('reduce', n);
    }, 1000);
  },
  reduceAction({ commit }, n) {
    debugger;
    commit('reduce', n);
  }
};
//模块组   为了共同开发。
const moduleA = {
  state,
  mutations,
  getters,
  actions
};

// const moduleB={
//     state,
//     mutations,
//     getters,
//     actions
// }
//暴露出去
export default new Vuex.Store({
  modules: { a: moduleA }
});
