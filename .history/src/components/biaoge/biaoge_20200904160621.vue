<template>
<el-table :table-data="userr" :columns="columns">

</el-table>
</template>
<script>
 export default {
   name: '',
//接收父组件传递过来的参数
   props: {
      userr:{
        type:Array,
        required: true
      },
      columns:{
        type:Array,
        required: true
      }
   },
   components: {

   },
// 定义变量
   data () {
     return {
        userr:''
     }
   },
//监听方法  click事件等
   methods: {

   },
//调用
   mounted() {

   },
   watch: {

   },
//计算
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>