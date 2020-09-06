<template>
 <div>
     <biaoge  
     :table-data="userr" 
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
          userr:''
        columns:[
           {
              label:"#",
              align:'center',
              width:'50'
           },
           {
              label:"职位",
              prop:"role_name",
              align:'center'
           },
            {
              label:"描述",
              prop:"role_desc",
              align:'center'
           },
           {
              label:"操纵",
              align:'center'
           },
        ] //表格的配置项

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