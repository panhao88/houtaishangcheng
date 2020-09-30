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
        <el-tag v-if="scope.row.cat_level === '一级'">一级</el-tag>
        <el-tag type="success" v-if="scope.row.cat_level === '二级'"
          >二级</el-tag
        >
        <el-tag type="danger" v-if="scope.row.cat_level === '三级'"
          >三级</el-tag
        >
      </template>
      <template v-slot:likes333="scope">
        <el-button type="primary" @click="add(scope.row)">
          <i class="el-icon-edit"></i>
          <span>编辑</span>
        </el-button>
        <el-button type="danger" @click="del(scope.row)">
          <i class="el-icon-coordinate"></i>
          <span>删除</span>
        </el-button>
      </template>
    </zk-table>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <div>
      <el-dialog title="编辑分类" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="ooo" :rules="rules">
          <el-form-item
            label="分类名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="app(scope.row)">确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
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
      dialogFormVisible: false,
      currentPage: 1,
      pagenum: 1,
      pagesize: 10,
      type: "", //查询参数
      formLabelWidth: "120px",
      form: {
        name: "",
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
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
          headerAlign: "center",
        },
        {
          label: "是否有效",
          align: "center",
          headerAlign: "center",
          type: "template",
          template: "didi",
        },
        {
          label: "排序",
          align: "center",
          headerAlign: "center",
          type: "template",
          template: "likes222",
        },
        {
          label: "操作",
          type: "template",
          template: "likes333",
          align: "center",
          headerAlign: "center",
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
    ...listActions(["getcategories", "getcategoriesfa"]),
    handleSizeChange(val) {
      this.pagesize = val;
      this.getcategories({
        type: this.type,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getcategories({
        type: this.type,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    add(row) {
      // console.log(row);
      this.dialogFormVisible = true;
      this.form.name = row.cat_name;
    },
    del(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // console.log(scope.row)
          this.getcategoriesfa({
            id: row.cat_id,
             type: this.type,
            pagenum: this.pagenum,
            pagesize: this.pagesize,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    app(row){
       this.dialogFormVisible = true;
       console.log(scop)
    }
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