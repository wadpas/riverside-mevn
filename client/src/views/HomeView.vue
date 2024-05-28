<template>
	<h1>Welcome to the Forum</h1>

	<div
		class="forum-list"
		v-for="category in categories">
		<h2 class="list-title">
			<a>{{ category.name }}</a>
		</h2>

		<ForumItem
			v-for="forumId in category.forums"
			:forum="categoryForum(forumId)" />
	</div>
</template>

<script setup>
	import axios from 'axios'
	import { onMounted, ref } from 'vue'
	import ForumItem from '../components/ForumItem.vue'

	const categories = ref([])
	const forums = ref([])

	function categoryForum(forumId) {
		return forums.value.find((forum) => forum._id === forumId)
	}

	onMounted(async () => {
		try {
			const resForums = await axios.get('/forums')
			forums.value = resForums.data

			const resCategories = await axios.get('/categories')
			categories.value = resCategories.data
		} catch (error) {
			console.log(error)
		}
	})
</script>
