<template>
 <div>
    <biaoge :roles="fication" :columns="columns">

    </biaoge>
 </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
const userModuel = createNamespacedHelpers('list')
const {mapState:listState , mapActions:listActions} = userModuel
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
        type:"",
        pagenum:1,
        pagesize:5,
        columns:[
           {
              label:'#',
              align:"center",
           },
           {
              label:'分类名称',
              align:"center",
              prop:"cat_name"
           },
           {
              label:'是否有效',
              align:"center",
              prop:""
           },
           {
              label:'排序',
              align:"center",
              prop:""
           },
           {
              label:'操纵',
              align:"center",
           },
        ]
     }
   },
//监听方法  click事件等
   methods: {
      ...listActions(["getcategories"])
   },
//调用
   mounted() {
      this.getcategories({
         type:this.type,
         pagenum:this.pagenum,
        pagesize:this.pagesize

      })
   },
   watch: {

   },
//计算
   computed: {
      ...listState(["fication"])
   }
 }
</script>

<style scoped lang='scss'>

</style>