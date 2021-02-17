<template>
    <div>
        <input v-model="name"/>
        <input v-model="info.city"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '双越',
            info: {
                city: '北京'
            }
        }
    },
    watch: {
        name(newVal, oldVal) {
            // eslint-disable-next-line
            console.log('watch name', newVal,oldVal) // 值类型，可正常拿到 newVal 和 oldVal
        },
        info: {
            handler(newVal, oldVal) {
                // eslint-disable-next-line
                console.log('watch info', newVal, oldVal) // 引用类型，拿不到 oldVal 。因为指针相同，此时已经指向了新的 val
            },
            deep: true // 深度监听
        }
    }
}
</script>