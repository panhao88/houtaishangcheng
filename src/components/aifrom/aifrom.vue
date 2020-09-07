<template>
  <!-- 表单封装 -->
  <div>
    <el-dialog title="提示" :visible="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="formOptions" :rules="rules" ref="form">
        <template v-for="(item,index) in formData">
          <el-form-item :key="index" :label="item.label" :prop="item.prop">
            <!-- 动态渲染组件-->
            <component v-model="formOptions[item.prop]" :is="`el-${item.type}`" v-bind="item.attrs"></component>
          </el-form-item>
        </template>
      </el-form>
      <slot name="footer" v-if="$slots.footer"></slot>
      <span slot="footer" v-else>
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Array,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      formOptions: {},
      rules: {},
    };
  },
  methods: {
    handleClose() {
      //this.$emit('update:dialogVisible',false) //标准用这个
      this.$parent.dialogVisible = false; //自己写代码可以同这个方法
      // console.log(1111)
    },
    setInitValue() {
      let options = {};
      let rules = {};
      this.formData.map((item) => {
        rules[item.prop] = item.rules;
        options[item.prop] = item.value;
      });
      // 只需要拿父组件传过来的初始值
      this.formOptions = JSON.parse(JSON.stringify(options));
      this.rules = JSON.parse(JSON.stringify(rules));
    },
    cancel() {
      let options = JSON.parse(JSON.stringify(this.formOptions));
      this.$emit("cancel", {
        options: options,
        formRef: this.$refs.form,
      });
      this.formData.map((item) => {
        if (item.children) this.formOptions[item.prop] = "";
      });
    },
    ok() {
      // 改变之后的值发给父组件
      let options = JSON.parse(JSON.stringify(this.formOptions));
      this.$emit("ok", {
        options: options,
        formRef: this.$refs.form,
      });
      this.formData.map((item) => {
        if (item.children) this.formOptions[item.prop] = "";
      });
    },
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {},
};
</script>

<style scoped lang='scss'>
</style>