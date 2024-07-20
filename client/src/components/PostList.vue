<template>
	<div class="post-list">
		<div
			v-for="post in posts"
			class="post">
			<div class="user-info">
				<a
					href="#"
					class="user-name">
					{{ userById(post.userId)?.name }}
				</a>
				<a href="#">
					<img
						class="avatar-large"
						:src="userById(post.userId)?.avatar"
						alt="" />
				</a>

				<p class="desktop-only text-small">{{ userById(post.userId)?.postsCount }} posts</p>
				<p class="desktop-only text-small">{{ userById(post.userId)?.threads.length }} threads</p>
			</div>

			<div class="post-content">
				<div class="col-full">
					<PostForm
						v-if="editing === post._id"
						:post="post"
						@save="handleUpdate">
						Edit Mode
					</PostForm>
					<p v-else>
						{{ post.text }}
					</p>
				</div>
				<a
					v-if="post.userId === authUser._id"
					@click.prevent="toggleEditMode(post._id)"
					href="#"
					style="margin-left: auto; padding-left: 10px"
					class="link-unstyled"
					title="Make a change">
					<fa icon="pencil-alt" />
				</a>
			</div>

			<div class="post-date text-faded">
				<AppDate :timestamp="post.publishedAt" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { onBeforeMount, ref } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useUsersStore } from '../stores/UsersStore'
	import { usePostsStore } from '../stores/PostsStore'
	import AppDate from './AppDate.vue'
	import PostForm from './PostForm.vue'

	const props = defineProps({ posts: Array })
	const usersStore = useUsersStore()
	const postsStore = usePostsStore()
	const { userById, authUser } = storeToRefs(usersStore)

	let editing = ref(null)

	onBeforeMount(async () => {
		try {
			await usersStore.fetchUsers()
		} catch (error) {
			console.log(error)
		}
	})

	function toggleEditMode(id) {
		editing.value = id === editing.value ? null : id
	}

	function handleUpdate(event) {
		postsStore.updatePost(event.value)
		editing.value = null
	}
</script>

<style scoped></style>
