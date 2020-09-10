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
      <template v-slot:didi="scope">
        <i class="el-icon-check" v-if="scope.scope.row.cat_deleted === false"></i>
        <i class="el-icon-close" v-else></i>
      </template>
      <template v-slot:gege="scope">
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
      pageSizes: [10, 20, 30, 40],
      currentPage: 1,
      type: "",
      pagenum: 1,
      pagesize: 10,
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
        selectionType: false
      },
      columns: [
        {
          label: "#",
          align: "center",
        },
        {
          label: "分类名称",
          align: "center",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          align: "center",
          headerAlign: "center",
          type: "template",
          template: "likes111"
        },
        {
          label: "排序",
          align: "center",
          prop: "cat_level",
        },
        {
          label: "操纵",
          align: "center",
          name: "gege",
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
    ...listActions(["getcategories"]),
    handleSizeChange(val) {
      // this.pageSize = val;
      // this.$store.dispatch("list/getcategories", {
      //   type: this.type,
      //   pagenum: this.pagenum,
      //   pagesize: this.pageSize,
      // })
      this.pageSize = val;
      this.getcategories({
        type: this.type,
        pagenum: this.pagenum,
        pagesize: this.pageSize,
      });
    },
    handleCurrentChange(val) {
      //  this.currentPage = val;
      // this.$store.dispatch("list/getcategories", {
      //   type: this.type,
      //   pagenum: this.currentPage,
      //   pagesize: this.pageSize,
      // })
      this.currentPage = val;
      this.getcategories({
        type: this.type,
        pagenum: this.currentPage,
        pagesize: this.pageSize,
      });
    },
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