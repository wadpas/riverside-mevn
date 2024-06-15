<template>
	<div
		v-for="forum in forums"
		class="forum-listing">
		<div class="forum-details">
			<router-link
				:to="{ name: 'ForumView', params: { id: forum._id } }"
				class="text-xlarge">
				{{ forum.name }}
			</router-link>

			<p>{{ forum.description }}</p>
		</div>

		<div class="threads-count">
			<p>
				<span class="count">{{ forum.threads.length }}</span>
				{{ forum.threads.length > 1 ? 'threads' : 'thread' }}
			</p>
		</div>
		<div class="last-thread"></div>
	</div>
</template>

<script setup>
	const props = defineProps({ forums: Array })
</script>
