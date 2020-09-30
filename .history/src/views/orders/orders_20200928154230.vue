<template>
  <div>
    <div class="box1">
      <div>
        <input
          type="text"
          placeholder="请输入内容"
          v-model="query"
          style="width: 200px; height: 30px"
        />
      </div>
      <div class="box2">
        <i class="el-icon-search"></i>
      </div>
    </div>
    <div style="margin-top: 30px">
      <el-card>
        <biaoge
          :total="total"
          :columns="columns"
          :index-options="indexOptions"
          :roles="order"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          :currentPage="currentPage"
          :pageSizes="pageSizes"
          :pageSize="pageSize"
        >
          <template v-slot:action1="scope">
            <el-tag type="danger" v-if="scope.scope.row.order_pay === 0"
              >未付款</el-tag
            >
            <el-tag type="danger" v-else>已付款</el-tag>
          </template>
          <template v-slot:didi="scope">
            <el-button type="primary" @click="del(scope.scope)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button type="success" @click="add(scope.scope)">
              <i class="el-icon-coordinate"></i>
            </el-button>
          </template>
        </biaoge>
        <el-dialog
          title="编辑地址"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
          @
        >
          <el-cascader
            :options="city"
            v-model="selectValue"
            style="width: 100%"
          ></el-cascader>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <el-dialog
          title="物流信息"
          :visible.sync="dialogVisible1"
          width="30%"
          :before-close="handleClose1"
        >
          <div>
            <el-steps direction="vertical" :active="1">
              <template v-for="(item, index) in kuaidi">
                <el-step
                  :title="item.context"
                  :description="item.time"
                  :key="index"
                ></el-step>
              </template>
            </el-steps>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible1 = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("order");
const { mapState: orderStste, mapActions: orderActions } = userModule;
import city from "../../utils/citydata"
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      currentPage: 1, //当前页数，
      pageSizes: [10, 20, 30, 40], //多少条一页个数选择器
      pageSize: 10, // 每页显示条数
      dialogVisible: false,
      dialogVisible1: false,
      city:city,
      columns: [
        {
          label: "#",
          align: "center",
        },
        {
          label: "订单编号",
          align: "center",
          prop: "order_number",
        },
        {
          label: "订单价格",
          align: "center",
          prop: "order_price",
        },
        {
          label: "是否付款",
          align: "center",
          name: "action1",
        },
        {
          label: "是否发货",
          align: "center",
          prop: "is_send",
        },
        {
          label: "下单时间",
          align: "center",
          prop: "update_time",
        },
        {
          label: "操纵",
          align: "center",
          name: "didi",
        },
      ],
      options: [
        {
          value: "zhinan",
          label: "我是你爹",
        },
      ],
      indexOptions: {
        showIndex: true,
        label: "#",
        align: "center",
        width: "200",
        indexMethod(index) {
          return index++;
        },
      },
      query: "",
      pagenum: 1,
      pagesize: 10,
      user_id: "",
      pay_status: "",
      is_send: "",
      order_fapiao_title: "",
      order_fapiao_company: "",
      order_fapiao_content: "",
      consignee_addr: "",
    };
  },
  //监听方法  click事件等
  methods: {
    ...orderActions(["getorders", "getkuaidi"]),
    del(scope) {
      this.dialogVisible = true;
      // console.log(scope.row);
    },
    add(scope) {
      console.log(scope);
      this.dialogVisible1 = true;
      this.getkuaidi({ id: 1106975712662 });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleClose1() {
      this.dialogVisible1 = false;
    },
    handleSizeChange(val) {
      // 每页 ${val} 条
      this.pageSize = val;
      this.getorders({
        pagenum: this.pagenum,
        pagesize: this.pageSize,
        query: this.query,
        user_id: this.user_id,
        pay_status: this.pay_status,
        is_send: this.is_send,
        order_fapiao_title: this.order_fapiao_title,
        order_fapiao_company: this.order_fapiao_company,
        order_fapiao_content: this.order_fapiao_content,
        consignee_addr: this.consignee_addr,
      });
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getorders({
        pagenum: this.currentPage,
        pagesize: this.pageSize,
        query: this.query,
        user_id: this.user_id,
        pay_status: this.pay_status,
        is_send: this.is_send,
        order_fapiao_title: this.order_fapiao_title,
        order_fapiao_company: this.order_fapiao_company,
        order_fapiao_content: this.order_fapiao_content,
        consignee_addr: this.consignee_addr,
      });
      console.log(`当前页: ${val}`);
    },
  },
  //调用
  mounted() {
    this.getorders({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
      user_id: this.user_id,
      pay_status: this.pay_status,
      is_send: this.is_send,
      order_fapiao_title: this.order_fapiao_title,
      order_fapiao_company: this.order_fapiao_company,
      order_fapiao_content: this.order_fapiao_content,
      consignee_addr: this.consignee_addr,
    });
  },
  watch: {},
  //计算
  computed: {
    ...orderStste(["order", "total", "kuaidi"]),
  },
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
</style>