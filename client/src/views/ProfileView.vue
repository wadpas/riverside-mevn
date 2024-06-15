<template>
	<div class="container">
		<div class="flex-grid">
			<div class="col-3 push-top">
				<div class="profile-card">
					<p class="text-center">
						<img
							:src="user.avatar"
							:alt="`${user.name}picture`"
							class="avatar-xlarge" />
					</p>

					<h1 class="title">{{ user.username }}</h1>

					<p class="text-lead">{{ user.name }}</p>

					<p class="text-justify">{{ user.bio || 'No bio specified' }}</p>

					<span class="online">{{ user.name }} is online</span>

					<div class="stats">
						<span>{{ posts.length }} posts</span>
						<span>{{ threads.length }} threads</span>
					</div>

					<hr />

					<p
						v-if="user.website"
						class="text-large text-center">
						<i class="fa fa-globe"></i>
						<a :href="user.website">{{ user.website }}</a>
					</p>
				</div>

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
					<span class="text-lead">{{ user.username }} recent activity</span>
					<a href="#">See only started threads?</a>
				</div>

				<hr />

				<PostItem
					v-for="post in posts"
					:post="post"
					:user="user"
					:key="post._id" />
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
	import PostItem from '../components/PostList.vue'
	const usersStore = useUsersStore()
	const threadsStore = useThreadsStore()
	const postsStore = usePostsStore()

	const { threads } = storeToRefs(threadsStore)
	const { posts } = storeToRefs(postsStore)
	const { authUser: user } = storeToRefs(usersStore)

	onMounted(() => {
		try {
			usersStore.fetchPosts({ userId: user.value._id })
			threadsStore.fetchThreads({ userId: user.value._id })
		} catch (error) {
			console.log(error.response.data.msg)
		}
	})
</script>
