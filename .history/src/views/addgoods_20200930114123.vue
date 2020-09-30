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
              <!-- <el-form-item label="商品分类">
                  <el-select
                    v-model="value"
                    clearable
                    placeholder="请选择"
                    :disabled="ruleForm.goods_number === '' ? true : false"
                  >
                    <el-option></el-option>
                  </el-select>
                </el-form-item> -->
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
          <el-button type="primary" @click="xiayibu">提交</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- <div class="box11" v-if="active === 0">
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
      </div> -->
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
      editableTabsValue: "0",
      tabPosition: "left",
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
</style>