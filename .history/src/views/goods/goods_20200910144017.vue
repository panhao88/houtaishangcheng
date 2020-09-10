<template>
  <div>
    <el-card>
      <div class="box1">
        <div>
          <input type="text" placeholder="请输入内容" v-model="query" style="width:200px;height:30px;" />
        </div>
        <div class="box2">
          <i class="el-icon-search"></i>
        </div>
        <div class="box3">
          <el-button type="primary" @click="goadddoods">添加内容</el-button>
        </div>
      </div>
    </el-card>
    <div>
      <el-card>
        <biaoge
          :roles="goods" 
          :columns="columns"
          :index-options="indexOptions" 
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          currentPage
        >
         <template v-slot:didi="scope">
             <el-button type="primary" size="mini" @click="del(scope.scope)">
                <i class="el-icon-edit"></i>
             </el-button>
              <el-button type="danger" size="mini" @click="add(scope.scope)">
                 <i class="el-icon-delete"></i>
              </el-button>
         </template>
        </biaoge>
      </el-card>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("list");
const { mapState: listStste, mapActions: listActions } = userModule;
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      pageSize:0,
      pageSizes=[10,20,30,40],
      currentPage:1,
      query: "",
      pagenum: 1,
      pagesize: 5,
      columns: [
        {
          label: "#",
          align: "center",
        },
        {
          label: "商品名称",
          align: "center",
          width: "500",
          prop: "goods_name",
        },
        {
          label: "商品价格（元）",
          align: "center",
          prop: "hot_mumber",
        },
        {
          label: "商品重量",
          align: "center",
          prop: "goods_weight",
        },
        {
          label: "创建时间",
          align: "center",
          prop: "upd_time",
        },
        {
          label: "操纵",
          align: "center",
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
    };
  },
  //监听方法  click事件等
  methods: {
    ...listActions(["getgoods"]),
    handleSizeChange() {},
    handleCurrentChange() {},
     goadddoods(){
      this.$router.push({name:"addgoods"})
    }
  },
  //调用
  mounted() {
    this.getgoods({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  //计算
  computed: {
    ...listStste(["goods","total"]),
  },
};
</script>

<style scoped lang='scss'>
.box1 {
  display: flex;
  align-items: center;
  margin-left: 30px;
}
.box2 {
  width: 40px;
  height: 34px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -1px;
  border: none;
  background: grey;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.box3 {
  margin-left: 30px;
}
</style>