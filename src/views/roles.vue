<template>
  <div>
    <div style="margin-left:20px">
      <el-button type="primary" @click="tianjia">添加用户</el-button>
    </div>
    <div style="margin-top:20px">
      <biaoge
        :roles="roles"
        :expand-options="true"
        :index-options="indexOptions"
        :columns="columns"
        :loadingOptions="loadingOptions"
      >
        <template v-slot:action="scope">
          <el-button type="primary" @click="edit(scope.scope)" size="mini">编辑</el-button>
          <el-button type="danger" @click="del(scope.scope)" size="mini">删除</el-button>
          <el-button type="warning" @click="distribution(scope.scope)" size="mini">分配权限</el-button>
        </template>
      </biaoge>
    </div>
    <div>
      <aifrom :dialogVisible="dialogVisible" :form-data="formData" @cancel="cancel" @ok="ok"></aifrom>
    </div>
  </div>
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
      dialogVisible: false,
      columns: [
        {
          label: "#",
          align: "center",
          width: "100",
        },
        {
          label: "职位",
          prop: "roleName",
          align: "center",
          width: "350",
        },
        {
          label: "描述",
          prop: "roleDesc",
          align: "center",
          width: "350",
        },
        {
          label: "操作",
          align: "center",
        },
      ],
      formData: [
        {
          label: "角色名",
          // 表单元素的类型
          type: "input",
          prop: "roleName",
          // v-model绑定的值
          value: "",
          attrs: {
            clearable: true,
          },
          rules: [
            {
              required: true,
              message: "角色不能为空",
              trigger: "blur",
            },
          ],
        },
        {
          label: "角色描述",
          // 表单元素的类型
          type: "input",
          prop: "password",
          // v-model绑定的值
          value: "",
          attrs: {
            clearable: true,
            "show-password": true,
          },
          
        },
      ],
      indexOptions: {
        showIndex: true,
        label: "#",
        align: "center",
        width: "200",
        indexMethod(index) {
          return index * 2;
        },
      },
      loadingOptions: {
        text: "加载中...",
        bgColor: "rgba(0, 0, 0, 0.8)",
      },
    };
    id:""
  },
  //监听方法  click事件等
  methods: {
    ...jurisdictionActions(["getroles","getrolesr"]),
    // 编辑
    edit(scope) {
      this.dialogVisible = true;
      // this.id = row.id
      console.log(scope.row)
      this.getrolesr(
        
      )
    },
    // 删除
    del() {},
    // 分配权限
    distribution() {},
    //添加用户
    tianjia() {},
    cancel(val) {
      this.$message.success('点击了取消')
      this.dialogVisible = false
      val.formRef.resetFields()
    },
    ok(val) {
      val.formRef.validate(valid => {
        if (valid) {
          this.dialogVisible = false
          console.log(val)
          val.formRef.resetFields()
        } else {
          this.$message.error('表单填写有误,请检查')
        }
      })

    }
  },
  //调用
  mounted() {
    this.getroles();
  },
  watch: {},
  //计算
  computed: {
    ...jurisdictionStste(["roles"]),
  },
};
</script>

<style scoped lang='scss'>
</style>