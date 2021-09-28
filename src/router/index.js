import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import MovieDetalies from '../components/MovieDetalies.vue'
import TicketSelection from '../components/TicketSelection.vue'
import SeatSelection from '../components/SeatSelection.vue'
import Confirmation from '../components/Confirmation.vue'

Vue.use(VueRouter)

const routes = [
 {
 	path: '/',
 	name: 'Home',
 	component: Home
 },
 {
 	path: '/movie/:id',
 	name: 'MovieDetaliesils',
 	component: MovieDetalies
 },
 {
 	path: '/movie/:id/tickets',
 	name: 'MovieTikets',
 	component: TicketSelection
 },
 {
 	path: '/movie/:id/seat-selection',
 	name: 'SeatSelection',
 	component: SeatSelection
 },
 {
 	path: '/confirmation',
 	name: 'Confirmation',
 	component: Confirmation
 }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
