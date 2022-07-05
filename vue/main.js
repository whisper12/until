import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'


import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'

import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import { parseTime, resetForm, addDateRange, addCreDateRange, selectDictLabel, selectDictLabels,selectAddressLabel, selectCommonLabel,download, handleTree,downloadExcel } from "@/utils/ruoyi";
import Pagination from "@/components/Pagination";
// 自定义表格工具扩展
import RightToolbar from "@/components/RightToolbar";

import 'lodash';

// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.addCreDateRange = addCreDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.selectCommonLabel = selectCommonLabel
Vue.prototype.selectAddressLabel = selectAddressLabel
Vue.prototype.download = download
Vue.prototype.downloadExcel = downloadExcel
Vue.prototype.handleTree = handleTree

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

Vue.prototype.copyObjKey = function(obj,copiedObj){
  let form = Object.assign({},copiedObj)
  for (let key in obj){
    obj[key] = form[key]
  }
}



Vue.mixin({
  data(){
    return {
      loadingIndex:''
    }
  },
  methods:{
    showLoading(){
      window.loadingIndex = this.$loading({
        lock: true,
        text: '服务处理中,请耐心等待',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    closeLoading(){
      window.loadingIndex.close()
    }
  }
})


// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)

Vue.use(permission)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false;
// 分转元
Vue.filter('moneyFixdTwo', function (value) {
  if(value===0) { return '¥0.00'}
  if(!value) {return ''}
  return `¥ ${(value / 100).toFixed(2)}`
})


// 图片地址拼接
Vue.filter('imgUrlFix', function (value) {
  if(!value) return '';
  return `${process.env.VUE_APP_BASE_IMGURL}${value}`
})

Vue.filter('fontImgUrlFix', function (value) {
  if(!value) return '';
  return `${process.env.VUE_APP_BASE_FRONTIMGURL}${value}`
})



// 规格拼接
Vue.filter('itemSpecsFix', function (value) {
  value = JSON.parse(value)
  let html = []
  value.forEach(res=>{
    html.push(`${res.property_name}:${res.property_value}`)
  })
  return html.join(' ')
})

Vue.filter('timeSubstr', function(value){
  if(value){
    let pos = value.indexOf(' ');
    console.log(116, pos)

    return value.slice(0, pos)
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
