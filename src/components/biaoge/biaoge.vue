
<template>
  <!-- 表格封装 -->
  <div>
    <el-table
      :data="roles"
      border
      stripe
      style="width: 100%"
      :element-loading-text="loadingOptions.text"
      :element-loading-spinner="loadingOptions.icon"
      :element-loading-background="loadingOptions.bgColor"
      v-loading="!roles.length"
    >
      <template v-for="(item,index) in columns">
        <template slot-scope="scope">
          <slot name="expand" :scope="scope"></slot>
        </template>
        <el-table-column
          v-if="item.label==='#'"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :key="index"
          type="index"
        ></el-table-column>
        <el-table-column
          v-if="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :key="index"
        ></el-table-column>
        <el-table-column
          v-if="!item.prop&&item.label!=='#'"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :key="index"
        >
          <template slot-scope="scope">
            <slot :name="item.name" :scope="scope"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div v-if="showPagination" class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {
    roles: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    expandOptions: {
      type: Boolean,
      reruired: true,
    },
    indexOptions: {
      type: Object,
      required: true,
    },
    total: {
      type: [String, Number],
      default: 0,
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40],
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    loadingOptions: {
      type: Object,
      default: () => {
        return {
          text: "",
          icon: "el-icon-loading",
          bgColor: "hsla(0,0%,100%,.9)",
        };
      },
    },
  },
  components: {},
  // 定义变量
  data() {
    return {};
  },
  //监听方法  click事件等
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
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
.pagination {
  width: 100%;
  display: flex;
  margin-top: 26px;
  position: relative;
}
</style>