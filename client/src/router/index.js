import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ThreadView from '../views/ThreadView.vue'
import ThreadCreditView from '../views/ThreadCreditView.vue'
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
		name: 'HomeView',
		component: HomeView,
	},
	{
		path: '/me',
		name: 'ProfileView',
		component: ProfileView,
		beforeEnter(to, from, next) {
			if (!localStorage.getItem('token')) {
				next({
					name: 'HomeView',
				})
			} else {
				next()
			}
		},
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
	},
	{
		path: '/signin',
		name: 'SingInView',
		component: SingInView,
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

export default router
