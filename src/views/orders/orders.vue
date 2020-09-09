<template>
  <div>
    <div class="box1">
      <div>
        <input type="text" placeholder="请输入内容" v-model="query" style="width:200px;height:30px;" />
      </div>
      <div class="box2">
        <i class="el-icon-search"></i>
      </div>
    </div>
    <div style="margin-top:30px">
      <el-card>
        <biaoge 
        :total="total"
        :columns="columns" 
        :index-options="indexOptions" 
        :roles="order"         
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange">
           <template v-slot:action1="scope">
              <el-tag type="danger" v-if="scope.scope.row.order_pay===0">未付款</el-tag>
              <el-tag type="danger" v-else>已付款</el-tag>
           </template>
           <template v-slot:action2="scope">
              <el-button type="primary" @click="del(scope.scops)">
                 <i class="el-icon-edit"></i>
              </el-button>
               <el-button type="success" @click="add(scope.scope)">
                  <i class="el-icon-coordinate"></i>
               </el-button>
           </template>
        </biaoge>
      </el-card>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("order");
const { mapState: orderStste, mapActions: orderActions } = userModule;
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {
      columns: [
        {
          label: "#",
          align: "center",
          
        },
        {
          label: "订单编号",
          align: "center",
          prop:"order_number"
        },
        {
          label: "订单价格",
          align: "center",
          prop:"order_price"
        },
        {
          label: "是否付款",
          align: "center",
          name:"action1"
        },
        {
          label: "是否发货",
          align: "center",
          prop:"is_send"
        },
        {
          label: "下单时间",
          align: "center",
          prop:"update_time"
        },
        {
          label: "操纵",
          align: "center",
          name:"action2"
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
      pagesize: 5,
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
    ...orderActions(["getorders",]),
    del(){

    },
    add(){

    },
    handleSizeChange(val){
      this.$store.dispatch("order/getorders",{
        pagenum:this.pagenum,
          pagesize: val,
        query: this.query
      })
    },
    handleCurrentChange(val){
        this.$store.dispatch("order/getorders", {
        query: this.query,
        pagenum: val,
        pagesize: this.pagesize
      });
    }
  },
  //调用
  mounted() {
    this.getorders({
      query: this.query,
      pagenum: this.pagenum,
      pagesize:this.pagesize,
      user_id:this.user_id,
      pay_status:this.pay_status,
      is_send:this.is_send,
      order_fapiao_title:this.order_fapiao_title,
      order_fapiao_company:this.order_fapiao_company,
      order_fapiao_content:this.order_fapiao_content,
      consignee_addr:this.consignee_addr,
    });
  },
  watch: {},
  //计算
  computed: {
    ...orderStste(["order","total"]),
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