<template>
  <div>
    <div style="margin-left:20px">
      <el-button type="primary" @click="dialogFormVisible1 = true">添加用户</el-button>
    </div>
    <div style="margin-top:30px">
      <el-table :data="roles" style="width: 100%;" border align="center">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div style="border-top:1px solid #f2f2f2;" v-if="props.row.children.length>0">
              <div v-for="(item,index) in props.row.children" :key="index">
                <div style="display:flex;align-items:center;border-bottom:1px solid #f2f2f2;">
                  <div style="padding:15px;">
                    <el-tag closable @close="handleClose1(props.row,item)">{{item.authName}}</el-tag>
                  </div>
                  <div>
                    <div
                      v-for="(item1,index1) in item.children"
                      :key="index1"
                      style="display:flex;
                  align-items:center;"
                    >
                      <div style="padding:15px;">
                        <el-tag
                          type="success"
                          closable
                          @close="handleClose2(props.row,item1)"
                        >{{item1.authName}}</el-tag>
                      </div>
                      <div style="display:flex;flex-wrap:wrap;">
                        <div v-for="(item2,index2) in item1.children" :key="index2">
                          <div style="padding:15px;">
                            <el-tag
                              type="warning"
                              closable
                              @close="handleClose3(props.row,item2)"
                            >{{item2.authName}}</el-tag>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>暂无数据</div>
          </template>
        </el-table-column>
        <el-table-column label="#" width="60" type="index"></el-table-column>
        <el-table-column prop="roleName" label="职位" width="120" align="center"></el-table-column>
        <el-table-column prop="roleDesc" label="描述" align="center"></el-table-column>
        <!-- 操纵 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip content="编辑角色" placement="top">
              <el-button size="mini" @click="handleEdit(scope.$index,scope.row)" type="primary">
                <span>编辑</span>
              </el-button>
            </el-tooltip>
            <el-tooltip content="删除角色" placement="top">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                <span>删除</span>
              </el-button>
            </el-tooltip>
            <el-tooltip content="分配角色" placement="top">
              <el-button
                size="mini"
                type="warning"
                @click="handleBelete(scope.$index, scope.row)"
              >分配权限</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加用户角色 -->
      <el-dialog title="添加角色" :visible.sync="dialogFormVisible1">
        <el-form :model="ruleForm" :rules="rules1">
          <el-form-item label="角色名" :label-width="formLabelWidth" prop="roleName">
            <el-input v-model="ruleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" :label-width="formLabelWidth">
            <el-input v-model="ruleForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="tianjia">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑用户角色 -->
      <el-dialog title="编辑角色" :visible.sync="dialogFormVisible2">
        <el-form :model="ruleForm1" :rules="rules" ref="ruleForm">
          <el-form-item label="角色名" :label-width="formLabelWidth" prop="roleName">
            <el-input v-model="ruleForm1.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" :label-width="formLabelWidth">
            <el-input v-model="ruleForm1.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="bianji">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分配权限 -->
      <el-dialog title="分配权限" :visible.sync="dialogFormVisible3">
        <el-tree
          :data="rights"
          show-checkbox
          :props="defaultProps"
          node-key="id"
          default-expand-all
          ref="tree"
          :default-checked-keys="treeid"
        ></el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="fenpei">确 定</el-button>
        </div>
      </el-dialog>
    </div>
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
      defaultProps: {
        children: "children",
        label: "authName"
      },
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      id: "",
      type: "tree",
      treeid: [],
      edit: {}, //编辑角色
      formLabelWidth: "80px",
      ruleForm: {
        roleName: "",
        roleDesc: ""
      },
      rules1: {
        roleName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ]
      },
      //角色编辑
      ruleForm1: {
        roleDesc: "",
        roleName: ""
      },
      rules: {
        roleName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ]
      }
    };
  },
  //监听方法  click事件等
  methods: {
    ...jurisdictionActions([
      "getroles",
      "getrolesw",
      "getrolesr",
      "getrolesid",
      "getrights",
      "getrolesjkl",
      "getrolesdel"
    ]),
    //添加
    tianjia() {
      this.dialogFormVisible1 = false;
      this.getrolesw({
        roleName: this.ruleForm.roleName,
        roleDesc: this.ruleForm.roleDesc
      });
    },
    //编辑角色列表
    handleEdit(index, row) {
      console.log(row);
      this.id = row.id;
      this.dialogFormVisible2 = true;
      this.ruleForm1.roleName = row.roleName;
    },
    //编辑角色列表
    bianji() {
      this.dialogFormVisible2 = false;
      this.getrolesr({
        id: this.id,
        roleName: this.ruleForm1.roleName,
        roleDesc: this.ruleForm1.roleDesc
      });
    },
    //删除
    handleDelete(index, row) {
      this.id = row.id;
      // console.log(this.id ,11)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.getrolesid({
            id: this.id
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //分配权限
    handleBelete(index, row) {
      // console.log(row);
      this.dialogFormVisible3 = true;
      this.edit = row;
      console.log(this.edit, "11");
      this.getrights({
        type: this.type
      });
      this.treeid = [];
      let a = [];
      a = row;
      // console.log(a ,11)
      a.children.map(item1 => {
        if (item1.children.length > 0) {
          item1.children.map(item2 => {
            item2.children.map(item3 => {
              this.treeid.push(item3.id);
            });
          });
        }
      });
      // console.log(this.treeid,"didi")
    },
    //确认分配
    fenpei() {
      this.dialogFormVisible3 = false;
      // concat拼接数组
      let arr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      let temp = arr.toString(); //数组转成字符串
      //  console.log(temp , 333)
      this.getrolesjkl({
        roleId: this.edit.id,
        rids: temp
      });
    },
      handleClose1(didi,item){
      // console.log(didi ,1 )
      // console.log(item ,2)
      this.getrolesdel({
        roleId:didi.id,
        rightId:item.id
      })
    },
    handleClose2(didi,item){
        this.getrolesdel({
        roleId:didi.id,
        rightId:item.id
      })
    },
    handleClose3(didi,item){
       this.getrolesdel({
        roleId:didi.id,
        rightId:item.id
      })
  },
  },
  //调用
  mounted() {
    this.getroles();
  },
  watch: {},
  //计算
  computed: {
    ...jurisdictionStste(["roles", "rights"])
  }
}
</script>

<style scoped lang='scss'>
</style>