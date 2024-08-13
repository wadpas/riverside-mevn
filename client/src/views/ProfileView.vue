<template>
	<div class="container">
		<div class="flex-grid">
			<div class="col-3 push-top">
				<ProfileCard
					v-if="!edit"
					:user="authUser"
					:posts="posts"
					:threads="threads" />

				<ProfileCardEditor
					v-else
					:activeUser="activeUser"
					:posts="posts"
					:threads="threads" />
			</div>

			<div class="col-7 push-top">
				<div class="profile-header">
					<span class="text-lead">{{ authUser?.username }} recent activity</span>
					<a href="#">See only started threads?</a>
				</div>

				<hr />
				{{ users }}
				{{ getUserPosts(authUser._id) }}
				<PostList :posts="posts" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { onBeforeMount, onMounted } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useThreadsStore } from '../stores/ThreadsStore'
	import { usePostsStore } from '../stores/PostsStore'
	import { useUsersStore } from '../stores/UsersStore'
	import PostList from '../components/PostList.vue'
	import ProfileCard from '../components/ProfileCard.vue'
	import ProfileCardEditor from '../components/ProfileCardEditor.vue'

	const usersStore = useUsersStore()
	const threadsStore = useThreadsStore()
	const postsStore = usePostsStore()

	const { threads } = storeToRefs(threadsStore)
	const { posts, getUserPosts } = storeToRefs(postsStore)
	const { users, authUser, activeUser } = storeToRefs(usersStore)

	const props = defineProps({
		edit: false,
	})

	onBeforeMount(async () => {
		const user = await usersStore.fetchUser()
		await postsStore.fetchPosts({ userId: user._id })
		await threadsStore.fetchThreads({ userId: user._id })
	})
</script>
