import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import FilmsPage from './views/FilmsPage.vue'
import FilmPage from './views/FilmPage.vue'
import CinemasPage from './views/CinemasPage.vue'
import CinemaPage from './views/CinemaPage.vue'
import LoginPage from './views/LoginPage.vue'
import AccountPage from './views/AccountPage.vue'

import SellPage from './views/SellPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/films',
      name: 'Filmy',
      component: FilmsPage
    },
    {
      path: '/film/:id',
      name: 'Film',
      component: FilmPage
    },
    {
      path: '/cinemas',
      name: 'Kina',
      component: CinemasPage
    },
    {
      path: '/cinema/:id',
      name: 'Kino',
      component: CinemaPage
    },
    {
      path: '/sell',
      name: 'Prodej',
      component: SellPage
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/myaccount',
      name: 'My Account',
      component: AccountPage
    }
  ]
})
