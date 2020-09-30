<template>
  <div>
    <div style="border-right:1px solid #ccc;height:100vh;">
      <el-row>
        <el-col>
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router unique-opened>
            <el-menu-item index="/home">
              <i class="el-icon-s-home"></i>
              <span>首页</span>
            </el-menu-item>
            <template v-for="item in menus">
              <el-submenu :index="item.path" class="el-menu-vertical-demo" :key="item.path" router>
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.authName}}</span>
                </template>
                <el-menu-item-group v-for="item1 in item.children" :key="item1.path">
                  <el-menu-item :index="`item1.path`">
                    <i :class="item1.icon"></i>
                    <span>{{item1.authName}}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </template>
          </el-menu>
        </el-col>
      </el-row>
    </div>
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
  //注册组件
  components: {},
  // 定义变量
  data() {
    return {};
  },
  //事件方法执行
  methods: {
    ...userActions(["getMenus"])
  },
  //页面初始化方法
  mounted() {
    this.getMenus();
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {
    ...userState(["menus"])
  }
};
</script>

<style scoped lang='scss'>
</style>