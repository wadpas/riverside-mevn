<template>
	<div class="post">
		<div class="user-info">
			<a
				href="#"
				class="user-name">
				{{ user.name }}
			</a>
			<a href="#">
				<img
					class="avatar-large"
					:src="user.avatar"
					alt="" />
			</a>

			<p class="desktop-only text-small">107 posts</p>
		</div>

		<div class="post-content">
			<div>
				<p>
					{{ post.text }}
				</p>
			</div>
		</div>

		<div class="post-date text-faded">
			<AppDate :timestamp="post.publishedAt" />
		</div>
	</div>
</template>

<script setup>
	import AppDate from './AppDate.vue'

	const props = defineProps({
		post: Object,
		user: Object,
	})
</script>

<style scoped></style>
