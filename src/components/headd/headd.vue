<template>
  <div>
    <div class="box">
      <div class="box1">
        <div>欢迎来到{{didi.username}}后台管理系统</div>
      </div>
      <div class="box2">
        <div>{{nowDate}}{{shijian}}{{nowTime}}</div>
        <div>多云</div>
        <div>亲爱的,{{didi.username}}</div>
        <div>退出</div>
      </div>
    </div>
  </div>
</template>

<script>
// import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      didi: {},
      nowDate: null, //存放年月日变量
      nowTime: null, //存放时分秒变量
      timer: "", //定义一个定时器的变量
      currentTime: new Date(), // 获取当前时间
      shijian: null, //判断上午下午
    };
  },
  methods: {
    //  获取时间
    gettime() {
      const date = new Date(); // 获取当前时间戳
      const year = date.getFullYear(); // 获取年份
      const month = date.getMonth() + 1; //获取月份(0-11,0代表1月,用的时候记得加上1)
      const day = date.getDate(); // 获取日
      const hour = date.getHours(); //获取小时
      const minute = date.getMinutes(); // 获取分钟
      const second = date.getSeconds(); //获取秒
      if (this.hour >=1 && this.hour < 11) {
        this.shijian ="上午"
      } else if (this.hour >= 11 && this.hour <13){
        this.shijian ="中午"
      }else if (this.hour >= 13 && this.hour <18){
        this.shijian ="下午"
      }else if(this.hour >= 18 && this.hour <24){
        this.shijian="晚上"
      }else{
        this.shijian="晚安宝贝"
      }
      this.month = check(month); // 检查当前月份
      this.day = check(day); //检查当前天数
      this.hour = check(hour);
      this.minute = check(minute);
      this.second = check(second);
      function check(i) {
        const num = i < 10 ? "0" + i : i;
        return num;
      }
      this.nowDate = year + "年" + this.month + "月" + this.day + "日";
      this.nowTime = this.hour + ":" + this.minute + ":" + this.second;
    },
  },
  mounted() {
    this.didi = JSON.parse(localStorage.getItem("adminUser"));
    // console.log(this.didi);
    //定义获取日期时间方法getTime,并在created() 生命周期里面调用，在实例创建前调用
    this.timer = setInterval(this.gettime, 1000);
  },
  // 离开页面使用beforeDestroy() 销毁
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除定时器
    }
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.box {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
}
.box1 {
  height: 70px;
  position: absolute;
  display: flex;
  align-items: center;
  left: 30px;
  font-size: 18px;
}
.box2 {
  width: 45%;
  justify-content: space-around;
  position: absolute;
  right: 30px;
  display: flex;
  align-items: center;
  height: 70px;
  font-size: 18px;
}
</style>