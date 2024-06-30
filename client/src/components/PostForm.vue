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
	import { storeToRefs } from 'pinia'
	import { useUsersStore } from '../stores/UsersStore'

	const emit = defineEmits(['save'])
	const text = ref('')
	const usersStore = useUsersStore()
	const { authUser } = storeToRefs(usersStore)

	async function savePost() {
		const post = {
			text: text.value,
			userId: authUser.value._id,
		}
		emit('save', { post })
		text.value = ''
	}
</script>
