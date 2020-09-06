<template>
  <div>
    <el-card>头部</el-card>
    <el-card>
      <div class="box1">
        <div>
          <input type="text" placeholder="请输入内容" v-model="query" style="width:200px;height:30px;" />
        </div>
        <div class="box2" @click="sousuo">
          <i class="el-icon-search"></i>
        </div>
        <div class="box3">
          <el-button type="primary" @click="dialogFormVisible3 = true">添加内容</el-button>
        </div>
      </div>
      <div style="margin-top:30px">
        <el-table :data="users" style="width: 100%;" border align="center">
          <el-table-column label="#" width="60" type="index"></el-table-column>
          <el-table-column prop="username" label="姓名" width="120"></el-table-column>
          <el-table-column prop="role_name" label="角色"></el-table-column>
          <el-table-column prop="mobile" label="电话"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="mg_state" label="状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.mg_state" @change="change(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <!-- 操纵 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip content="编辑角色" placement="top">
                <el-button size="mini" @click="handleEdit(scope.$index,scope.row)" type="primary">
                  <i class="el-icon-edit"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip content="删除角色" placement="top">
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip content="分配角色" placement="top">
                <el-button size="mini" type="warning" @click="handleBelete(scope.$index,scope.row)">
                  <i class="el-icon-s-tools"></i>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[5,10,15,20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <!-- 添加用户弹出框 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible3">
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="mobile">
              <el-input v-model="ruleForm.mobile"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible3 = false">取 消</el-button>
            <el-button type="primary" @click="addqunren">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 编辑用户弹出框 -->
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisible1">
          <el-form label-width="80px" :model="ruleForm1">
            <el-form-item label="用户名" label-width="60px">
              <el-input v-model="ruleForm1.username" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="60px">
              <el-input v-model="ruleForm1.email"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="60px">
              <el-input v-model="ruleForm1.mobile"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="changedidi">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 分配用户弹出框 -->
        <el-dialog title="分配用户" :visible.sync="dialogFormVisible2">
          <el-form :model="gototi" ref="ruleForm">
            <el-form-item label="当前用户:" :label-width="formLabelWidth">{{gototi.username}}</el-form-item>
            <el-form-item label="当前角色:" :label-width="formLabelWidth">{{gototi.role_name}}</el-form-item>
            <el-form-item :label-width="formLabelWidth">
              <el-select v-model="value" placeholder="请选择" clearable>
                <el-option
                  v-for="item in users"
                  :key="item.id"
                  :label="item.roleDesc"
                  :value="item.roleame"
                ></el-option>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2= false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      pagenum: 1, //当前页数
      pagesize: 5, //每页显示条数
      query: "", //查询参数
      id: "", //删除用户id
      gototi: {}, //分配用户
      currentPage4: 1, // 默认第几页
      dialogFormVisible1: false, //编辑弹出框
      dialogFormVisible2: false, //分配角色弹出框
      dialogFormVisible3: false, //添加用户弹出框
      ruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      ruleForm1: {
        username: "",
        email: "",
        mobile: ""
      },
      form: {
        username: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur"]
          }
        ],
        mobile: [
          {
            required: true,
            message: "请输入电话号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  //监听方法  click事件等
  methods: {
    ...userActions([
      "getusers",
      "deleteuser",
      "getuserlist",
      "getetusers",
      "getuserser",
      "getusersjkl",
      "getusersolp"
    ]),
    //弹出框编辑用户
    handleEdit(index, row) {
      // console.log(index ,row)
      this.dialogFormVisible1 = true;
      this.id = row.id;
      this.ruleForm1.username = row.username;
      this.ruleForm1.email = row.email;
      this.ruleForm1.mobile = row.mobile;
    },
    // 修改编辑用户
    changedidi() {
      this.dialogFormVisible1 = false;
      this.getuserser({
        id: this.id,
        username: this.ruleForm1.username,
        email: this.ruleForm1.email,
        mobile: this.ruleForm1.mobile
      });
    },
    // 弹出分配用户
    handleBelete(index, row) {
      this.gototi = row;
      console.log(this.gototi, "分配用户");
      this.dialogFormVisible2 = true;
      this.getusersolp();
    },
    //分页每页多少条
    handleSizeChange(val) {
      this.$store.dispatch("user/getusers", {
        pagenum: this.pagenum,
        pagesize: val,
        query: this.query
      });
    },
    //分页当前是第几页
    handleCurrentChange(val) {
      this.$store.dispatch("user/getusers", {
        query: this.query,
        pagenum: val,
        pagesize: this.pagesize
      });
    },
    // 删除用户
    handleDelete(index, row) {
      this.id = row.id;
      console.log(this.id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteuser({
            id: this.id,
            pagenum: this.pagenum,
            pagesize: this.pagesize,
            query: this.query
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //搜索框
    sousuo() {
      this.getusers({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      });
    },
    //修改用户状态
    change(e) {
      console.log(e);
      this.getetusers({
        uId: e.id,
        type: e.mg_state,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      });
    },
    // 添加用户
    addqunren() {
      this.dialogFormVisible3 = false;
      this.getuserlist({
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        email: this.ruleForm.email,
        mobile: this.ruleForm.mobile,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      });
    }
  },
  //调用
  mounted() {
    this.getusers({
      pagenum: this.pagenum,
      pagesize: this.pagesize,
      query: this.query
    });
  },
  watch: {},
  //计算
  computed: {
    ...userState(["users", "total"])
  }
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