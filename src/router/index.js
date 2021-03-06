import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Scrum from '@/components/Main/Scrum'
import Kanban from '@/components/Main/Kanban'
import ScrumDashboard from '@/components/Main/Scrum/dashboard'
import KanbanDashboard from '@/components/Main/Kanban/dashboard'
import ScrumDaily from '@/components/Main/Scrum/daily'
import ScrumPlanning from '@/components/Main/Scrum/planning'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/scrum',
          name: 'scrum',
          component: Scrum,
          children: [
            {
              path: 'dashboard',
              name: 'scrumDashboard',
              component: ScrumDashboard
            },
            {
              path: 'daily',
              name: 'scrumDaily',
              component: ScrumDaily
            },
            {
              path: 'planning',
              name: 'scrumPlanning',
              component: ScrumPlanning
            }]
        },
        {
          path: '/kanban',
          name: 'kanban',
          component: Kanban,
          children: [
            {
              path: 'dashboard',
              name: 'kanbanDashboard',
              component: KanbanDashboard
            }]
        }]
    }
  ]
})
