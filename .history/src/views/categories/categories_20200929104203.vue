<template>
  <div>
    <zk-table
      ref="table"
      sum-text="sum"
      index-text="#"
      :data="fication"
      :columns="columns"
      :stripe="props.stripe"
      :border="props.border"
      :show-header="props.showHeader"
      :show-summary="props.showSummary"
      :show-row-hover="props.showRowHover"
      :show-index="props.showIndex"
      :tree-type="props.treeType"
      :is-fold="props.isFold"
      :expand-type="props.expandType"
      :selection-type="props.selectionType"
    >
      <template slot="didi" scope="scope">
        <i class="el-icon-check" v-if="scope.row.cat_deleted === false"></i>
        <i class="el-icon-close" v-else></i>
      </template>
      <template slot="likes222" scope="scope">
         <el-tag v-if="scope.row.cat_level==='一级'">一级</el-tag>
          <el-tag type="success" v-if="scope.row.cat_level==='二级'">二级</el-tag>
          <el-tag type="danger" v-if="scope.row.cat_level==='三级'">三级</el-tag>
      </template>
      <template slot="likes333" scope="scope">
        <el-button type="primary" @click="del(scope.scope)">
          <i class="el-icon-edit"></i>
          <span>编辑</span>
        </el-button>
        <el-button type="danger" @click="add(scope.scope)">
          <i class="el-icon-coordinate"></i>
          <span>删除</span>
        </el-button>
      </template>
    </zk-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModuel = createNamespacedHelpers("list");
const { mapState: listState, mapActions: listActions } = userModuel;
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      type: "",
      pagenum: 1,
      pagesize: ,
      type: "", //查询参数
      props: {
        stripe: false,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: false,
        showIndex: true,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false,
      },
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
          align: "center",
          headerAlign: "center"
        },
        {
          label: "是否有效",
          align: "center",
          headerAlign: "center",
          type: "template",
          template: "didi"
        },
        {
          label: "排序",
          align: "center",
          headerAlign: "center",
          type: "template",
          template: "likes222"
        },
        {
          label: "操作",
          type: "template",
          template: "likes333",
          align: "center",
          headerAlign: "center"
        }
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
    ...listActions(["getcategories","getcategoriesfa"]),
    // handleSizeChange(val) {
    //   this.pageSize = val;
    //   this.$store.dispatch("list/getcategories", {
    //     type: this.type,
    //     pagenum: this.pagenum,
    //     pagesize: this.pageSize,
    //   })
    //   this.pageSize = val;
    //   this.getcategories({
    //     type: this.type,
    //     pagenum: this.pagenum,
    //     pagesize: this.pageSize,
    //   });
    // },
    // handleCurrentChange(val) {
    //    this.currentPage = val;
    //   this.$store.dispatch("list/getcategories", {
    //     type: this.type,
    //     pagenum: this.currentPage,
    //     pagesize: this.pageSize,
    //   })
    //   this.currentPage = val;
    //   this.getcategories({
    //     type: this.type,
    //     pagenum: this.currentPage,
    //     pagesize: this.pageSize,
    //   });
    // },
  },
  //调用
  mounted() {
    this.getcategories({
      type: this.type,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  //计算
  computed: {
    ...listState(["fication", "total"]),
  },
};
</script>

<style scoped lang='scss'>
</style>