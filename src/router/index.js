// import VueRouter from 'vue-router'
import{ createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/home/Home')
const Category = () => import('@/views/category/Category')
const Cart = () => import('@/views/cart/Cart')
const Profile = () => import('@/views/profile/Profile')
const Detail = () => import('@/views/detail/Detail')

const routes =[
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

// const router = new VueRouter({
//   routes,
//   mode:"history"
// })

// const routerHistory = createWebHistory()
const router = createRouter({
  history: createWebHistory(),
  routes,
}
)


export default router

// //避免重复路由报错，当使用的是$router.replace时
// const VueRouterReplace = VueRouter.prototype.replace
// VueRouter.prototype.replace = function replace (to) {
//   return VueRouterReplace.call(this, to).catch(err => err)
// }

// //避免重复路由报错，当使用的是$router.push时
// const VueRouterPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (to) {
//     return VueRouterPush.call(this, to).catch(err => err)
// }