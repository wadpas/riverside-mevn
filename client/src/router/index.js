import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ThreadView from '../views/ThreadView.vue'
import ForumView from '../views/ForumView.vue'
import NotFound from '../views/NotFoundView.vue'
import axios from 'axios'

const routes = [
	{
		path: '/',
		name: 'HomeView',
		component: HomeView,
	},
	{
		path: '/forums/:id',
		name: 'ForumView',
		component: ForumView,
		props: true,
	},
	{
		path: '/threads/:id',
		name: 'ThreadView',
		component: ThreadView,
		props: true,
		beforeEnter(to, from, next) {
			axios
				.get('/threads/' + to.params.id)
				.then(() => {
					next()
				})
				.catch(() => {
					next({
						name: 'NotFound',
						params: { pathMatch: to.path.substring(1).split('/') },
						query: to.query,
						hash: to.hash,
					})
				})
		},
	},
	{
		path: '/forums/:id',
		name: 'ForumView',
		component: ForumView,
		props: true,
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFound,
	},
]

const router = createRouter({ history: createWebHistory(), routes })

export default router
