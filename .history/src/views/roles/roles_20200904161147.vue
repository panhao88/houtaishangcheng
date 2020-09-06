<template>
 <div>
     <biaoge  
      v-if="userr.length"
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
        columns: [
        {
          label: '姓名',
          prop: 'username',
          align: 'center',
          // width: '800'
        },
        {
          label: '角色',
          prop: 'role_name',
          align: 'center'
        },
        {
          label: '电话',
          prop: 'mobile',
          align: 'center'
        },
        {
          label: '邮箱',
          prop: 'email',
          align: 'right'
        },
        {
          label: '状态',
          prop: 'mg_state',
          align: 'center',
          slots: 'state'
        },
        {
          label: '操作',
          align: 'center'
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