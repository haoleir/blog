<template>
  <div class>
    <input type="text" :value="title" @input="$emit('change',$event.target.value)" />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  props: {
    title: { type: String }
  },
  model: {
    prop: ["title"],
    event: "change"
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus"></style>