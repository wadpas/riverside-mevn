import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Blog from '../views/Blog.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFoundView.vue'
import ReviewGrid from '../components/ReviewGrid.vue'
import ReviewCreate from '../components/ReviewCreate.vue'
import ReviewDetails from '../components/ReviewDetails.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/about',
		name: 'about',
		component: About,
	},
	{
		path: '/blog',
		name: 'blog',
		component: Blog,
		children: [
			{
				path: 'all',
				name: 'all',
				component: ReviewGrid,
			},
			{
				path: 'new',
				name: 'new',
				component: ReviewCreate,
			},
			{
				path: ':id',
				name: 'details',
				component: ReviewDetails,
				props: true,
			},
		],
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFound,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to) {
		const scroll = {}
		if (to.meta?.toTop) scroll.top = 0
		if (to.meta?.smoothScroll) scroll.behavior = 'smooth'
		return scroll
	},
})

router.beforeEach((to, from) => {
	if (to.meta.requestAuth && !localStorage.getItem('neos_token')) {
		return { name: 'SingInView' }
	}
	if (to.meta.requiresGest && localStorage.getItem('neos_token')) {
		return { name: 'HomeView' }
	}
})

export default router
