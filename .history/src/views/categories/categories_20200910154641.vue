<template>
 <div>
    <biaoge :roles="fication" :columns="columns" :indexOptions="indexOptions" >
       <template v-slot:didi="scope">
          <i class="el-icon-check" v-if="scope.sc"></i>
       </template>
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
              prop:"cat_level"
           },
           {
              label:'操纵',
              align:"center",
              name:"didi"
           },
        ],
        indexOptions: {
        showIndex: true,
        align: "center",
        width: "200",
        indexMethod(index) {
          return index++;
        },
      },
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