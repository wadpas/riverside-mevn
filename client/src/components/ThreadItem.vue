<template>
	<div class="thread">
		<div>
			<p>
				<router-link :to="{ name: 'ThreadView', params: { id: thread._id } }">
					{{ thread.title }}
				</router-link>
			</p>
			<p class="text-faded text-xsmall">
				By
				<a href="#">{{ user.name }}</a>
				created
				<AppDate :timestamp="thread.publishedAt" />
			</p>
		</div>
		<div class="activity">
			<p class="replies-count">{{ thread.posts.length }} replies</p>
			<img
				class="avatar-medium"
				:src="user.avatar"
				alt="" />
			<div>
				<p class="text-xsmall">
					<a href="#">{{ user.name }}</a>
				</p>
				<p class="text-xsmall text-faded">
					<AppDate :timestamp="thread.publishedAt" />
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	import AppDate from './AppDate.vue'

	const props = defineProps({
		thread: Object,
		user: Object,
	})
</script>

<style scoped></style>
