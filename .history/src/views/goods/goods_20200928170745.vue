<template>
  <div>
    <el-card>
      <div class="box1">
        <div>
          <input
            type="text"
            placeholder="请输入内容"
            v-model="query"
            style="width: 200px; height: 30px"
          />
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
          :currentPage="currentPage"
          :pageSizes="pageSizes"
          :pageSize="pageSize"
          :total="total"
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
        <el-dialog title="编辑商品" :visible.sync="dialogVisible">
          <el-form
            :model="form"
            :rules="rules"
            ref="ruleForm"
          >
            <el-form-item label="商品名称" :label-width="formLabelWidth" prop="goods_name">
              <el-input v-model="form.goods_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" :label-width="formLabelWidth" prop="hot_mumber">
              <el-input v-model="form.hot_mumber" autocomplete="off" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" :label-width="formLabelWidth" prop="goods_number">
              <el-input
                v-model="form.goods_number"
                autocomplete="off"
                type="number"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品重量" :label-width="formLabelWidth" prop="goods_weight">
              <el-input
                v-model="form.goods_weight"
                autocomplete="off"
                type="number"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="submitForm('ruleForm')">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </div>
        </el-dialog>
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
      pageSize: 10,
      pageSizes: [10, 20, 30, 40],
      currentPage: 1,
      query: "",
      pagenum: 1,
      pagesize: 10,
      dialogVisible: false,
      form: {
        goods_name: "",
        hot_mumber: "",
        goods_number: "",
        goods_weight: "",
      },
      formLabelWidth: '120px',
      rules: {
        goods_name: [{ required: true, message: "商品名称不能为空" }],
        hot_mumber: [{ required: true, message: "商品价格不能为空" }],
        goods_number: [{ required: true, message: "商品数量不能为空" }],
        goods_weight: [{ required: true, message: "商品重量不能为空" }],
      },
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
          name: "didi",
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
    ...listActions(["getgoods,goodsiddd"]),
    handleSizeChange(val) {
      this.pageSize = val;
      this.getgoods({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pageSize,
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getgoods({
        query: this.query,
        pagenum: this.currentPage,
        pagesize: this.pageSize,
      });
    },
    submitForm(formName){
         this.dialogVisible = false
         this.$refs[formName].resetFields()
    },
    del(scope) {
      this.dialogVisible = true;
        this.form.goods_name = scope.row.goods_name
        this.form.hot_mumber = scope.row.hot_mumber
        this.form.goods_number  = scope.row.goods_number
        this.form.goods_weight = scope.row.goods_weight
      // console.log(scope.row,111)
    },
    add(scope){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.goodsiddd({
            id:scope.row
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    goadddoods() {
      this.$router.push({ name: "addgoods" });
    },
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
    ...listStste(["goods", "total"]),
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