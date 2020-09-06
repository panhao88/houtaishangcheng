<template>
<el-table :data="userr" 
border
v-loading="!userr.length"
>
   <template v-for="(item,index) in columns">
      <el-table-column v-if="item.prop" :label="item.lebel" :prop="item.prop" :align="item.align" :width="item.width" :key="index"> 
      </el-table-column>
      <el-table-column 
      :label="item.lebel"
      :width="item.width"
      :align="item.align"
      :key="index"
      v-else
      >
      <template slot-scope="scope">
         <slot name="action" :scope></slot>
      </template>
      </el-table-column>
   </template> 
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