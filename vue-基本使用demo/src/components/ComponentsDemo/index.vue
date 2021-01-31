<template>
    <div>
        <Input @add="addHandler"/>
        <List v-if="is" :list="list" @delete="deleteHandler"/>
        <br/>
        <div>
            <button @click="deleteChildComponent">销魂子组件</button>
        </div>
    </div>
    
</template>

<script>
import Input from './Input';
import List from './List';

export default {
  components: {
    Input,
    List
  },
  data() {
    return {
      is: true,
      list: [
        {
          id: 'id-1',
          title: '标题1'
        },
        {
          id: 'id-2',
          title: '标题2'
        }
      ]
    };
  },
  methods: {
    addHandler(title) {
      this.list.push({
        id: `id-${Date.now()}`,
        title
      });
    },
    deleteHandler(id) {
      this.list = this.list.filter(item => item.id !== id);
    },
    deleteChildComponent() {
      this.is = false;
    }
  },
  beforeCreate() {
    console.log('父组件 beforeCreate');
  },
  created() {
    // eslint-disable-next-line
    console.log('父组件 created');
  },
  beforeMount() {
    console.log('父组件 beforeMount');
  },
  mounted() {
    // eslint-disable-next-line
    console.log('父组件 mounted');
  },
  beforeUpdate() {
    // eslint-disable-next-line
    console.log('父组件 beforeUpdate');
  },
  updated() {
    // eslint-disable-next-line
    console.log('父组件 updated');
  },
  beforeDestroy() {
    console.log('父组件 beforeDestroy');
  },
  destroyed() {
    console.log('父组件 destroyed');
  }
};
</script>