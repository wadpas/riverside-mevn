<template>
	<form @submit.prevent="savePost">
		<div class="form-group">
			<textarea
				v-model="post.text"
				name=""
				id=""
				cols="30"
				rows="10"
				class="form-input" />
		</div>
		<div class="form-actions">
			<button class="btn-blue">Submit</button>
		</div>
	</form>
</template>

<script setup>
	import { ref } from 'vue'

	const props = defineProps({ post: {} })
	const emit = defineEmits(['save'])

	let post = ref({ ...props.post })

	async function savePost() {
		emit('save', post)
		post = {}
	}
</script>
