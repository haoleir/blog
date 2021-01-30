<template>
    <div>
        <ul>
            <li v-for="item in list" :key="item.id">
                {{item.title}}

                <button @click="deleteItem(item.id)">删除</button>
            </li>
        </ul>
    </div>
</template>

<script>
import event from './event'

export default {
    // props: ['list']
    props: {
        // prop 类型和默认值
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {

        }
    },
    methods: {
        deleteItem(id) {
            this.$emit('delete', id)
        },
        addTitleHandler(title) {
            // eslint-disable-next-line
            console.log('on add title', title)
        }
    },
    beforeCreate(){
        console.log('子组件 beforeCreate')
    },
    created() {
        // eslint-disable-next-line
        console.log('子组件 created')
    },
    beforeMount(){
        console.log('子组件 beforeMount')
    },
    mounted() {
        // eslint-disable-next-line
        console.log('子组件 mounted')

        // 绑定自定义事件
        event.$on('onAddTitle', this.addTitleHandler)
    },
    beforeUpdate() {
        // eslint-disable-next-line
        console.log('子组件 beforeUpdate')
    },
    updated() {
        // eslint-disable-next-line
        console.log('子组件 updated')
    },
    beforeDestroy() {
        // 及时销毁，否则可能造成内存泄露
        console.log('子组件 beforeDestroy')
        event.$off('onAddTitle', this.addTitleHandler)
    },
    destroyed() {
        console.log('子组件 destroyed')
    }
}
</script>