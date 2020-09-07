<template>
 <div>
yuytuytuytu
 </div>
</template>

<script>

    import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("jurisdiction");
const {
  mapState: jurisdictionStste,
  mapActions: jurisdictionActions,
} = userModule;
 export default {
   name: '',
//接收父组件传递过来的参数
   props: {
   },
   components: {

   },
// 定义变量
   data () {
     return {

     }
   },
//监听方法  click事件等
   methods: {
 ...jurisdictionActions([
     getrights
    ]),
   },
//调用
   mounted() {

   },
   watch: {

   },
//计算
   computed: {
 ...jurisdictionStste(["rights"]),
   }
 }
</script>

<style scoped lang='scss'>

</style>