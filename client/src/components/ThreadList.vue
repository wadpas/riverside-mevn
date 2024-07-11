<template>
	<div
		v-for="thread in threads"
		class="thread">
		<div>
			<p>
				<router-link :to="{ name: 'ThreadView', params: { id: thread._id } }">
					{{ thread.title }}
				</router-link>
			</p>
			<p class="text-faded text-xsmall">
				By
				<a href="#">{{ userById(thread.userId).name }}</a>
				created
				<AppDate :timestamp="thread.publishedAt" />
			</p>
		</div>
		<div class="activity">
			<p class="replies-count">{{ thread.posts.length - 1 }} replies</p>
			<img
				class="avatar-medium"
				:src="userById(thread.userId).avatar"
				alt="" />
			<div>
				<p class="text-xsmall">
					<a href="#">{{ userById(thread.userId).name }}</a>
				</p>
				<p class="text-xsmall text-faded">
					<AppDate :timestamp="thread.publishedAt" />
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useUsersStore } from '../stores/UsersStore'
	import AppDate from './AppDate.vue'

	const props = defineProps({ threads: Array })
	const usersStore = useUsersStore()
	const { userById } = storeToRefs(usersStore)

	onMounted(async () => {
		try {
			await usersStore.fetchUsers()
		} catch (error) {
			console.log(error)
		}
	})
</script>

<style scoped></style>
