<template>
  <!-- 表单封装 -->
  <div>
   
  </div>
</template>

<script>
export default {
  name: "",
  props: {
      dialogVisible:{
        type:Boolean,
        default:false
      }
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    handleClose(){
      this.$emit('update:dialogVisible',false)
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
</style>