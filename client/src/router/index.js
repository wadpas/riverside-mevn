import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Blogs from '../views/Blogs.vue'
import CreatePost from '../views/CreatePost.vue'
import LoginRegister from '../views/LoginRegister.vue'
import NotFound from '../views/NotFoundView.vue'
import ProfileView from '../views/ProfileView.vue'
import RegisterView from '../views/RegisterView.vue'
import { useForumsStore } from '../stores/ForumsStore'
import { useUsersStore } from '../stores/UsersStore'

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
		path: '/blogs',
		name: 'blogs',
		component: Blogs,
	},
	{
		path: '/create-post',
		name: 'create-post',
		component: CreatePost,
	},

	{
		path: '/login-register',
		name: 'login-register',
		component: LoginRegister,
	},
	{
		path: '/logout',
		name: 'SignOut',
		async beforeEnter(to, from) {
			await useUsersStore().signOut()
			return { name: 'HomeView' }
		},
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
