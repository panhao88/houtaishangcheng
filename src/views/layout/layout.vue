<template>
  <div>
    <el-container>
      <el-header>
          <headd></headd>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <sidebar></sidebar>
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headd from '../../components/headd/headd'
import sidebar from '../../components/sidebar/sidebar'
export default {
  name: "",
  props: {},
  components: {
      headd,
      sidebar
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.el-header{
   padding: 0px;
   height: 70px !important;
}
</style>