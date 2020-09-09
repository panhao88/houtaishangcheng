<template>
    <biaoge :roles="rights" :columns="columns" :index-options="indexOptions">
      <template v-slot:action="scope">
          <el-tag v-if="scope.ABC.row.level==='0'">一级</el-tag>
          <el-tag type="success" v-if="scope.ABC.row.level==='1'">二级</el-tag>
          <el-tag type="danger" v-if="scope.ABC.row.level==='2'">三级</el-tag>
        </template>
    </biaoge>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("jurisdiction");
const {
  mapState: jurisdictionStste,
  mapActions: jurisdictionActions,
} = userModule;
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      type:"list",
      columns:[
        {
          label:"#",
          align:"center"
        },
        {
          label:"权限名称",
          align:"center",
           prop: "authName",
        },{
          label:"权限等级",
          align:"center",
          name: "action",
        },
      ],
      indexOptions:{
        showIndex:true,
        label:"#",
        align:"center",
        width:"200",
        indexMethod(index){
          return index++
        }
      }
    };
  },
  //监听方法  click事件等
  methods: {
    ...jurisdictionActions(["getrights"]),
  },
  //调用
  mounted() {
    
       this.getrights({
         type:this.type
       })
  
  },
  watch: {},
  //计算
  computed: {
    ...jurisdictionStste(["rights"]),
  },
};
</script>

<style scoped lang='scss'>
</style>