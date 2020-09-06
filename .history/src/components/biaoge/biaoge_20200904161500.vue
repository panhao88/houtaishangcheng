<template>
<el-table :table-data="userr" >
   <template v-for="(item, index) in columns">
        <el-table-column
            v-if="item.prop"
            :label="item.label"
            :prop="item.prop"
            :align="item.align"
            :width="item.width"
            :key="index">
          <template slot-scope="scope">
            <slot v-if="item.slots" :name="item.slots" :scope="scope"></slot>
            <template v-else>
              <el-input v-model="scope.row[item.prop]" 
              v-if="scope.row.clickFlag === 1"></el-input>
              <span v-else>{{scope.row[item.prop]}}</span>
            </template>
          </template>
        </el-table-column>
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