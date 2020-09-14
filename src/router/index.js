import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/index'
import FormBox from '@/components/formBox'


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/FormBox',
      name: 'FormBox',
      component: FormBox
    },
  ]
});
Vue.use(VueRouter)

export default router;
