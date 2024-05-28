<template>
	<form @submit.prevent="savePost">
		<div class="form-group">
			<textarea
				v-model="text"
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
	import { ref, defineEmits } from 'vue'

	const emit = defineEmits(['save'])
	const text = ref('')

	async function savePost() {
		const post = {
			text: text.value,
			userId: '324d58435944716d4e416832',
		}
		emit('save', { post })
		text.value = ''
	}
</script>
