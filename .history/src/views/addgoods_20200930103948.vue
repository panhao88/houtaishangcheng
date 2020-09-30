<template>
  <div>
    <div>
      <el-steps :active="active" align-center finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div style="display: flex">
      <el-radio-group v-model="tabPosition">
        <el-tabs :tab-position="tabPosition" style="height: 200px">
          <el-tab-pane label="基本信息">
             <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <div>
              
            </div>
      </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品参数">配置管理</el-tab-pane>
          <el-tab-pane label="商品属性">角色管理</el-tab-pane>
          <el-tab-pane label="商品图片">定时任务补偿</el-tab-pane>
          <el-tab-pane label="商品内容">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-radio-group>
      <div class="box11" v-if="active === 0">
      <div class="box33"> 
      <div
            v-if="
              ruleForm.goods_name &&
              ruleForm.hot_mumber &&
              ruleForm.goods_weight &&
              ruleForm.goods_number !== ''
            "
          >
            <el-button type="primary" @click="goxiayibu(active)"
              >下一步</el-button
            >
          </div> 
      </div>
      </div>
      <div v-if="active === 1">
        <div>didi</div>
        <el-button type="primary" @click="goxiayibu(active)">下一步</el-button>
      </div>
      <div v-if="active === 2">
        <div>didi</div>
        <el-button type="primary" @click="goxiayibu(active)">下一步</el-button>
      </div>
      <div v-if="active === 3">
        <div>didi</div>
        <el-button type="primary" @click="goxiayibu(active)">下一步</el-button>
      </div>
      <div v-if="active === 4">
        <div>didi</div>
        <el-button type="primary" @click="goxiayibu(active)">提交</el-button>
      </div>
     </div>
  </div>
</template>

<script>
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      active: 0,
      tabPosition: "left",
      todolist: [
        {
          title: "基本信息",
          id: 0,
        },
        {
          title: "商品参数",
          id: 1,
        },
        {
          title: "商品属性",
          id: 2,
        },
        {
          title: "商品图片",
          id: 3,
        },
        {
          title: "商品内容",
          id: 4,
        },
      ],
      ruleForm: {
        goods_name: "",
        hot_mumber: "",
        goods_weight: "",
        goods_number: "",
      },
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        hot_mumber: [
          { required: true, message: "价格不能为空", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "重量不能为空", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "数量不能为空", trigger: "blur" },
        ],
      },
    };
  },
  //监听方法  click事件等
  methods: {
    choseindex(index) {
      this.active = index;
      // console.log(this.active);
    },
    goxiayibu() {
      this.active = this.active + 1;
    },
  },
  //调用
  mounted() {},
  watch: {},
  //计算
  computed: {},
};
</script>

<style scoped lang='scss'>
.classdidi {
  color: red;
  padding: 8px;
  border-right: red 3px solid;
}
.box11 {
  width: 100%;
  display: flex;
  margin-top: 30px;
}
.box22 {
  width: 10%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 15px;
}

</style>