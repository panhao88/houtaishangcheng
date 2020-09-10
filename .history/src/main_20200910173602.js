import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from "echarts"
import dayjs from 'dayjs'
import './globalComponents'
import './bus'
import ZkTable from 'vue-table-with-tree-grid'
 
Vue.component(ZkTable.name, ZkTable)
Vue.use(ElementUI);
dayjs().format();
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
