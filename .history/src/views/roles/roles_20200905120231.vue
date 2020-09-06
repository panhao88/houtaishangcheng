<template>
 <div>
     <biaoge  
     :userr="userr" 
     :columns="columns"></biaoge>
 </div>
</template>
<script>
import {createNamespacedHelpers} from 'vuex'
const userModule = createNamespacedHelpers("jurisdiction")
const {mapState,mapActions} = userModule
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
      ...mapActions(["getroles"])
   },
//调用
   mounted() {
      this.getroles();
   },
   watch: {

   },
//计算
   computed: {
      ...mapState(['userr'])
   }
 }
</script>

<style scoped lang='scss'>

</style>