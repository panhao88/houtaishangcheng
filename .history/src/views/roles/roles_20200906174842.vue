<template>
  <div>
    <biaoge :roles="roles" :expand-options="true" :index-options="indexOptions" :columns="columns" :loadingOptions="loadingOptions">
      <template v-slot:action="scope">
        <el-button type="primary" @click="edit(scope.scope)">编辑</el-button>
        <el-button type="danger" @click="del(scope.scope)">删除</el-button>
        <el-button type="warning" @click="distribution(scope.scope)">分配权限</el-button>
      </template>
    </biaoge>
      <aifrom>
     
      </aifrom>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("jurisdiction");
const {
  mapState: jurisdictionStste,
  mapActions: jurisdictionActions
} = userModule;
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
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
      indexOptions: {
        showIndex: true,
        label: "#",
        align: "center",
        width: "200",
        indexMethod(index) {
          return index * 2;
        }
      },
       loadingOptions: {
        text: "加载中...",
        bgColor: "rgba(0, 0, 0, 0.8)"
      }
    };
  },
  //监听方法  click事件等
  methods: {
    ...jurisdictionActions(["getroles"]),
    // 编辑
    edit(){

    },
    // 删除
    del(){
      
    }
  },
  //调用
  mounted() {
    this.getroles();
  },
  watch: {},
  //计算
  computed: {
    ...jurisdictionStste(["roles"])
  }
};
</script>

<style scoped lang='scss'>
</style>