import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import ParentView from '@/components/ParentView';

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => require(['@/views/redirect'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/error/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error/401'], resolve),
    hidden: true
  },
  {
    path: '/forget',
    component: (resolve) => require(['@/views/forgetPassword'], resolve),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    hidden: true,
    children: [
        {
        path: 'index',
        redirect:'/promotion/list',
       }
      // {
      //   path: 'index',
      //   component: (resolve) => require(['@/views/index'], resolve),
      //   name: '概况',
      //   meta: { title: '概况', icon: 'dashboard', noCache: true, affix: true }
      // }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: (resolve) => require(['@/views/system/user/profile/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/dict',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'type/data/:dictId(\\d+)',
        component: (resolve) => require(['@/views/system/dict/data'], resolve),
        name: 'Data',
        meta: { title: '字典数据', icon: '' }
      }
    ]
  },
  {
    path: '/job',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: (resolve) => require(['@/views/monitor/job/log'], resolve),
        name: 'JobLog',
        meta: { title: '调度日志' }
      }
    ]
  },
  {
    path: '/gen',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit/:tableId(\\d+)',
        component: (resolve) => require(['@/views/tool/gen/editTable'], resolve),
        name: 'GenEdit',
        meta: { title: '修改生成配置' }
      }
    ]
  },
  {
    path: '/promotion',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'list',
        component: (resolve) => require(['@/views/promotion/list'], resolve),
        name: 'promotionList',
        meta: { title: '政策列表' }
      },
      {
        path:'customer',
        component: (resolve) => require(['@/views/promotion/customer'], resolve),
        name: 'promotionCustomer',
        meta: { title: '政策适用客户' }
      },
      {
        path: 'add',
        component: (resolve) => require(['@/views/promotion/add'], resolve),
        name: 'promotionAdd',
        meta: { title: '添加政策' }
      },
      {
        path: 'modify/:id',
        component: (resolve) => require(['@/views/promotion/add'], resolve),
        name: 'promotionModify',
        meta: { title: '编辑政策' }
      },
      {
        path: 'modifyOn/:id',
        component: (resolve) => require(['@/views/promotion/add'], resolve),
        name: 'promotionModifyOn',
        meta: { title: '编辑政策' }
      },
      {
        path: 'copy/:id',
        component: (resolve) => require(['@/views/promotion/add'], resolve),
        name: 'promotionCopy',
        meta: { title: '复制政策' }
      },
      {
        path: 'view/:id',
        component: (resolve) => require(['@/views/promotion/add'], resolve),
        name: 'promotionView',
        meta: { title: '查看政策' }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'goodsList',
        component: (resolve) => require(['@/views/goods/goodsList'], resolve),
        name: 'goodsList',
        meta: { title: '商品列表' }
      },
      {
        path: 'add',
        component: (resolve) => require(['@/views/goods/goodsAdd'], resolve),
        name: 'goodsAdd',
        meta: { title: '添加商品' }
      },
      {
        path: 'modify',
        component: (resolve) => require(['@/views/goods/goodsAdd'], resolve),
        name: 'goodsModify',
        meta: { title: '编辑商品' }
      },
      {
        path: 'copy',
        component: (resolve) => require(['@/views/goods/goodsAdd'], resolve),
        name: 'goodsCopy',
        meta: { title: '复制商品' }
      },
      {
        path: 'giftList',
        component: (resolve) => require(['@/views/goods/giftList'], resolve),
        name: 'giftList',
        meta: { title: '赠品列表' }
      },
      {
        path: 'propertyList',
        component: (resolve) => require(['@/views/goods/propertyList'], resolve),
        name: 'propertyList',
        meta: { title: '商品规格' }
      },
      {
        path: 'bannerList',
        component: (resolve) => require(['@/views/goods/bannerList'], resolve),
        name: 'bannerList',
        meta: { title: '轮播图管理' }
      },
    ]
  },
  {
    path: '/sales',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'salespersonList',
        component: (resolve) => require(['@/views/sales/salespersonList'], resolve),
        name: 'salespersonList',
        meta: { title: '关联销售列表' }
      },
      {
        path: 'salesCustromList',
        component: (resolve) => require(['@/views/sales/salesCustromList'], resolve),
        name: 'salesCustromList',
        meta: { title: '关联客户列表' }
      }
    ]
  },
  {
    path: '/dictionary',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'brandManage',
        component: (resolve) => require(['@/views/dictionary/brandManage'], resolve),
        name: 'dicBrandManage',
        meta: { title: '品牌管理' }
      },
      {
        path: 'customerClassify',
        component: (resolve) => require(['@/views/dictionary/customerClassify'], resolve),
        name: 'dicCustomerClassify',
        meta: { title: '客户分类' }
      },
      {
        path: 'goodsClassify',
        component: (resolve) => require(['@/views/dictionary/goodsClassify'], resolve),
        name: 'dicGoodsClassify',
        meta: { title: '商品分类' }
      },
      {
        path: 'promotionType',
        component: (resolve) => require(['@/views/dictionary/promotionType'], resolve),
        name: 'dicPromotionType',
        meta: { title: '政策类型' }
      },
      // {
      //   path: 'storeManage',
      //   component: (resolve) => require(['@/views/dictionary/storeManage'], resolve),
      //   name: 'dicStoreManage',
      //   meta: { title: '仓库管理' }
      // },
    ]

  },
  {
    path: '/order',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'list',
        component: (resolve) => require(['@/views/order/index'], resolve),
        name: 'orderList',
        meta: { title: '订单列表' }
      },
      {
        path: 'detail',
        component: (resolve) => require(['@/views/order/detail'], resolve),
        name: 'orderDetail',
        meta: { title: '订单详情' }
      },
      {
        path: 'import',
        component: (resolve) => require(['@/views/order/import'], resolve),
        name: 'import',
        meta: { title: '订单导入' }
      },
      {
        path: 'afterSale',
        component: (resolve) => require(['@/views/order/afterSaleOrder'], resolve),
        name: 'afterSaleOrder',
        meta: { title: '售后订单' }
      },
      {
        path: 'afterDetail',
        component: (resolve) => require(['@/views/order/afterSaleOrderDetail'], resolve),
        name: 'afterSaleOrderDetail',
        meta: { title: '售后订单详情' }
      }
    ]
  },
  {
    path: '/stamp',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'verification',
        component: (resolve) => require(['@/views/stamp/verification'], resolve),
        name: 'verification',
        meta: { title: '贴花核销' }
      },
      {
        path: 'waitVerification',
        component: (resolve) => require(['@/views/stamp/waitVerification'], resolve),
        name: 'waitVerification',
        meta: { title: '待核销贴花' }
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'list',
        component: (resolve) => require(['@/views/customer/list'], resolve),
        name: 'customerList',
        meta: { title: '客户列表' }
      },
      {
        path: 'csDetail/:id',
        component: (resolve) => require(['@/views/customer/csDetail'], resolve),
        name: 'csDetail',
        meta: { title: '客户详情' ,noCache: true}
      },
      {
        path: 'csLoginList/:id',
        component: (resolve) => require(['@/views/customer/csLoginList'], resolve),
        name: 'csLoginList',
        meta: { title: '客户登录账号' ,noCache: true}
      },
      {
        path: 'csAddressList/:id',
        component: (resolve) => require(['@/views/customer/csAddressList'], resolve),
        name: 'csAddressList',
        meta: { title: '客户收货地址' ,noCache: true}
      },
    ]
  },
  {
    path: '/financial',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'chargeList',
        component: (resolve) => require(['@/views/financial/chargeList'], resolve),
        name: 'chargeList',
        meta: { title: '充值列表' ,noCache: true,}
      },
      {
        path: 'chargeDetailList',
        component: (resolve) => require(['@/views/financial/chargeDetailList'], resolve),
        name: 'chargeDetailList',
        meta: { title: '充值明细列表'}
      },
      {
        path: 'chargeListDetail/:optType/:topUpType/',
        component: (resolve) => require(['@/views/financial/chargeListDetail'], resolve),
        name: 'chargeListDetail',
        meta: { title: '新增充值' },
        children:[
          {
            path: ':id',
            component: (resolve) => require(['@/views/financial/chargeListDetail'], resolve),
            name: 'chargeListDetail',
            meta: { title: '充值详情' }
          },
        ]
      },
      {
        path: 'accounRest',
        component: (resolve) => require(['@/views/financial/accounRest'], resolve),
        name: 'accounRest',
        meta: { title: '账户余额' }
      },
      {
        path: 'accounRestDetail/:id',
        component: (resolve) => require(['@/views/financial/accounRestDetail'], resolve),
        name: 'accounRestDetail',
        meta: { title: '账户余额详情' }
      },
      {
        path: 'tradeList',
        component: (resolve) => require(['@/views/financial/tradeList'], resolve),
        name: 'tradeList',
        meta: { title: '流水明细' }
      },
      {
        path: 'tradeListDetail/:id',
        component: (resolve) => require(['@/views/financial/tradeListDetail'], resolve),
        name: 'tradeListDetail',
        meta: { title: '流水明细详情' }
      },
      {
        path: 'csAccountList',
        component: (resolve) => require(['@/views/financial/csAccountList'], resolve),
        name: 'csAccountList',
        meta: { title: '客户账户明细' }
      }
    ]
  },
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
