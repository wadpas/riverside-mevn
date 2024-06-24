<template>
	<div class="container">
		<div class="flex-grid">
			<div class="col-3 push-top">
				<ProfileCard
					:user="authUser"
					:posts="posts"
					:threads="threads" />

				<ProfileCardEditor
					:activeUser="activeUser"
					:posts="posts"
					:threads="threads" />

				<p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>

				<div class="text-center">
					<hr />
					<a
						href="edit-profile.html"
						class="btn-green btn-small">
						Edit Profile
					</a>
				</div>
			</div>

			<div class="col-7 push-top">
				<div class="profile-header">
					<span class="text-lead">{{ userById('324d58435944716d4e416832')?.username }} recent activity</span>
					<a href="#">See only started threads?</a>
				</div>

				<hr />

				<PostList :posts="posts" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { onMounted, ref } from 'vue'
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
	const { posts } = storeToRefs(postsStore)
	const { authUser, activeUser, userById } = storeToRefs(usersStore)

	onMounted(async () => {
		try {
			await usersStore.fetchUsers()
			await postsStore.fetchPosts({ userId: authUser._id })
			await threadsStore.fetchThreads({ userId: authUser._id })
		} catch (error) {
			console.log(error)
		}
	})
</script>
