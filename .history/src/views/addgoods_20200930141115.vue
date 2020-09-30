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
    <div style="margin-top: 20px">
      <el-tabs
        :tab-position="tabPosition"
        style="height: 300px; width: 1400px"
        v-model="editableTabsValue"
      >
        <el-tab-pane label="基本信息">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <div>
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="ruleForm.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="hot_mumber">
                <el-input
                  v-model="ruleForm.hot_mumber"
                  :disabled="ruleForm.goods_name === '' ? true : false"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input
                  v-model="ruleForm.goods_weight"
                  :disabled="ruleForm.hot_mumber === '' ? true : false"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input
                  v-model="ruleForm.goods_number"
                  :disabled="ruleForm.goods_weight === '' ? true : false"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品分类">
                <el-cascader
                  v-model="ruleForm.goods_cat"
                  :options="fication"
                 :props="{ expandTrigger: 'hover' ,label:'cat_name',value:'cat_name'}"
               
                ></el-cascader>
              </el-form-item>
              <div v-if="this.ruleForm.goods_weight !== ''">
                <el-button type="primary" @click="xiayibu">下一步</el-button>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" :disabled="didi1">
          <el-button type="primary" @click="xiayibu">下一步</el-button>
        </el-tab-pane>
        <el-tab-pane label="商品属性" :disabled="didi2">
          <el-button type="primary" @click="xiayibu">下一步</el-button>
        </el-tab-pane>
        <el-tab-pane label="商品图片" :disabled="didi3">
          <el-upload class="upload-demo" drag action="/api/upload" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
          <el-button type="primary" @click="xiayibu">下一步</el-button>
        </el-tab-pane>
        <el-tab-pane label="商品内容" :disabled="didi4">
          <el-button type="primary" @click="tijiao">提交</el-button>
        </el-tab-pane>
      </el-tabs>
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
      active: 0,
      editableTabsValue: "0",
      tabPosition: "left",
      options: [],
      didi1: true,
      didi2: true,
      didi3: true,
      didi4: true,
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
        goods_cat:''
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
    ...listActions(["getcategories", "getgoodspppp","getcategories",]),
    xiayibu() {
      if (this.active > 5) {
        this.active = 0;
        this.editableTabsValue = "0";
      } else {
        this.active++;
        this.editableTabsValue = this.active.toString();
        if (this.active === 1) {
          this.didi1 = false;
        } else if (this.active === 2) {
          this.didi2 = false;
        } else if (this.active === 3) {
          this.didi3 = false;
        }
      }
    },
    tijiao() {
      this.getgoodspppp({
        goods_name: this.ruleForm.goods_name,
        goods_cat,
        goods_price: this.ruleForm.hot_mumber,
        goods_number: this.ruleForm.goods_number,
        goods_weight: this.ruleForm.goods_weight,
      });
    },
  },
  //调用
  mounted() {},
  watch: {},
  //计算
  computed: {
    ...listState(["fication", "total","fication", ]),
  },
};
</script>

<style scoped lang='scss'>
.classdidi {
  color: red;
  padding: 8px;
  border-right: red 3px solid;
}
</style>