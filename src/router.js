import Vue from 'vue'
import Router from 'vue-router'
import Items from './views/items.vue'
import Champions from './views/champions.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'items',
      component: Items
    },
    {
      path: '/champions',
      name: 'champions',
      component: Champions
    }
  ]
})
