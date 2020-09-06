<template>
 <div>
     <biaoge  
     :roles="roles" 
     :expand-options="true"
     
     :columns="columns">
      <template v-slot:action="scope">
        <el-button type="primary" @click="del(scope.scope)">编辑</el-button>
        <el-button type="danger" @click="del(scope.scope)">删除</el-button>
        <el-button type="warning" @click="del(scope.scope)">分配权限</el-button>
      </template>
     </biaoge>
 </div>
</template>
<script>
import {createNamespacedHelpers} from 'vuex'
const userModule = createNamespacedHelpers("jurisdiction")
const {mapState:jurisdictionStste,mapActions:jurisdictionActions} = userModule
 export default {
   name: '',
//接收父组件传递过来的参数
   props: {
   },
   components: {

   },
// 定义变量
   data () {
     return {
        columns: [
        {
          label: "#",
          align: "center",
          width: "100"
        },
        {
          label: "职位",
          prop: "roleName", 
          align: "center",
          width: "350"
        },
        {
          label: "描述",
          prop: "roleDesc",
          align: "center",
          width: "350"
        },
        {
          label: "操作",
          align: "center"
        }
      ],

     }
   },
//监听方法  click事件等
   methods: {
      ...jurisdictionActions(["getroles"])
   },
//调用
   mounted() {
      this.getroles();
   },
   watch: {

   },
//计算
   computed: {
      ...jurisdictionStste(['roles'])
   }
 }
</script>

<style scoped lang='scss'>

</style>