<template>
  <div>
    <CustomVModel v-model="title" />
  </div>
</template>

<script type="text/ecmascript-6">
import CustomVModel from "./CustomVModel";

export default {
  name: "",
  components: { CustomVModel },
  data() {
    return {
      title: "123"
    };
  },
  computed: {},
  watch: {
    title(newVal, oldVal) {
      console.log(newVal, oldVal);
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>