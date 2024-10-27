import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import ThreadView from '../views/ThreadView.vue'
import ThreadCreditView from '../views/About.vue'
import ForumView from '../views/ForumView.vue'
import NotFound from '../views/NotFoundView.vue'
import ProfileView from '../views/ProfileView.vue'
import RegisterView from '../views/RegisterView.vue'
import SingInView from '../views/SingInView.vue'
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
		path: '/me',
		name: 'ProfileView',
		component: ProfileView,
		meta: { toTop: true, smoothScroll: true, requestAuth: true },
	},
	{
		path: '/me/edit',
		name: 'ProfileEditView',
		component: ProfileView,
		props: { edit: true },
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
	},
	{
		path: '/forums/threads/sample',
		name: 'ThreadCreditView',
		component: ThreadCreditView,
		meta: { requestAuth: true },
		props: true,
		beforeEnter(to, from, next) {
			if (Object.keys(useForumsStore().forum).length === 0) {
				next({
					name: 'HomeView',
				})
			} else {
				next()
			}
		},
	},
	{
		path: '/register',
		name: 'RegisterView',
		component: RegisterView,
		meta: { requiresGest: true },
	},
	{
		path: '/signin',
		name: 'SingInView',
		component: SingInView,
		meta: { requiresGest: true },
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
