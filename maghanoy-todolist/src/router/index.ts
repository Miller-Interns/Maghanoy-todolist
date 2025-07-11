import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoList from '../views/todo-list.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/TODOLIST',
      name: 'TODOLIST',
      component: TodoList,
    },
  //   {
  //     path: '/about',
  //     name: 'about',
  //     // route level code-splitting
  //     // this generates a separate chunk (About.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import('../views/AboutView.vue'),
  // //   },
  // //       {
  // //     path: '/',
  // //     name: 'HomeView',
  // //     component: HomeView,
  // //   },
  ],
})

export default router
