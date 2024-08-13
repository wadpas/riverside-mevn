<template>
	<div class="flex-grid justify-center">
		<div class="col-2">
			<form
				@submit.prevent="signIn"
				class="card card-form">
				<h1 class="text-center">Login</h1>

				<div class="form-group">
					<label for="email">Email</label>
					<input
						id="email"
						v-model="credentials.email"
						type="text"
						class="form-input" />
				</div>
				<div class="form-group">
					<label for="password">Password</label>
					<input
						id="password"
						v-model="credentials.password"
						type="password"
						class="form-input" />
				</div>

				<div class="push-top">
					<button
						type="submit"
						class="btn-blue btn-block">
						Log in
					</button>
				</div>

				<div class="form-actions text-right">
					<router-link :to="{ name: 'RegisterView' }">Create account</router-link>
				</div>
			</form>

			<div class="push-top text-center">
				<button class="btn-red btn-xsmall">
					<i class="fa fa-google fa-btn"></i>
					Sign in with Google
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useUsersStore } from '../stores/UsersStore'
	import { useRoute, useRouter } from 'vue-router'

	const usersStore = useUsersStore()
	const emit = defineEmits(['savePost'])
	const router = useRouter()

	let credentials = {
		email: '',
		password: '',
	}

	async function signIn() {
		try {
			await usersStore.loginUser(credentials)
			router.push({ name: 'HomeView' })
		} catch (error) {
			alert(error.message)
		}
	}

	// onMounted(emit('ready'))
</script>
