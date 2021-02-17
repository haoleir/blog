<template>
    <div>
        <p>vue 高级特性</p>
        <hr>

        <!-- 自定义 v-model -->
        <!-- <p>{{name}}</p>
        <CustomVModel v-model="name"/> -->

        <!-- nextTick -->
        <!-- <NextTick/> -->

        <!-- slot -->
        <!-- <SlotDemo :url="website.url">
            {{website.title}}
        </SlotDemo> -->

        <!-- 作用域插槽 -->
        <!-- <ScopedSlotDemo :url="website.url">
            <template v-slot="slotProps">
                {{slotProps.slotData.title}}
            </template>
        </ScopedSlotDemo> -->
        
        <!-- 具名插槽 -->
        <!-- <NamedSlot>
            <template v-slot:header>
                <h1>将插入到 header slot 中</h1>
            </template>
            <p>将插入到 main slot 中，即未命名的slot中</p>
            <template v-slot:footer>
                <p>将插入到 footer slot 中</p>
            </template>
        </NamedSlot> -->

        <!-- 动态组件 -->
        <!-- <component :is="NextTickName"/> -->
        
        <!-- 异步组件 -->
        <!-- <FormDemo v-if="showFormDemo"/>
        <button @click="showFormDemo = true">show form demo</button> -->

        <!-- keep-alive -->
        <!-- <KeepAlive/> -->

        <!-- mixin -->
        <MixinDemo/>
    </div>
</template>

<script>
// import CustomVModel from './CustomVModel'
// import NextTick from './NextTick'
// import SlotDemo from './SlotDemo'
// import ScopedSlotDemo from './ScopedSlotDemo';
// import NamedSlot from './NamedSlot';
// import KeepAlive from './KeepAlive'
import MixinDemo from './MixinDemo'

export default {
  components: {
    // CustomVModel
    // NextTick
    // SlotDemo,
    // ScopedSlotDemo,
    // NamedSlot
    // FormDemo: () => import('../BaseUse/FormDemo'),
    // KeepAlive
    MixinDemo
  },
  data() {
    return {
      name: '双越',
      website: {
        url: 'http://imooc.com/',
        title: 'imooc',
        subTitle: '程序员的梦工厂'
      },
      // NextTickName: "NextTick",
      showFormDemo: false
    };
  }
};
</script>