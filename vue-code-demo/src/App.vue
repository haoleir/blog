<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <TplDemo/>

    <!-- <ComputedDemo/> -->

    <!-- <WatchDemo/> -->

    <!-- <ClassDemo/> -->

    <!-- <ConditionDemo/> -->

    <!-- <ListDemo/> -->

    <!-- <EventDemo/> -->

    <!-- <FormDemo/> -->

    <!-- <div>
      <ComponentDemo v-if="is"/>
      <br/>
      <button @click="is=false">销毁父子组件</button>
    </div> -->

    <!-- <AdvancedUse/> -->

    <!-- <VuexDemo/> -->

    <!-- <CartDemo/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

import TplDemo from './components/BaseUse/TplDemo'

// import ComputedDemo from './components/BaseUse/ComputedDemo'

// import WatchDemo from './components/BaseUse/WatchDemo'

// import ClassDemo from './components/BaseUse/ClassDemo'

// import ListDemo from './components/BaseUse/ListDemo'

// import EventDemo from './components/BaseUse/EventDemo'

// import FormDemo from './components//FormDemo'

// import ComponentDemo from './components/ComponentsDemo/index';

// import AdvancedUse from './components/AdvancedUse/index'

// import VuexDemo from './components/BaseUse/VuexDemo'

// import CartDemo from './components/Cart/index'

export default {
  name: 'app',
  components: {
    // HelloWorld,
    TplDemo,
    // ComputedDemo,
    // WatchDemo,
    // ClassDemo,
    // ConditionDemo,
    // ListDemo,
    // EventDemo,
    // FormDemo,
    // ComponentDemo,
    // AdvancedUse,
    // VuexDemo,
    // CartDemo
  },
  data() {
    return {
      is: true
    };
  }
};
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
