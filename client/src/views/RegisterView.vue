<template>
	<div class="flex-grid justify-center">
		<div class="col-2">
			<form
				@submit.prevent="register"
				action=""
				class="card card-form">
				<h1 class="text-center">Register</h1>

				<div class="form-group">
					<label for="name">Full Name</label>
					<input
						id="name"
						v-model="user.name"
						type="text"
						class="form-input" />
				</div>

				<div class="form-group">
					<label for="username">Username</label>
					<input
						id="username"
						v-model="user.username"
						type="text"
						class="form-input" />
				</div>

				<div class="form-group">
					<label for="email">Email</label>
					<input
						id="email"
						v-model="user.email"
						type="email"
						class="form-input" />
				</div>

				<div class="form-group">
					<label for="password">Password</label>
					<input
						id="password"
						v-model="user.password"
						type="password"
						class="form-input" />
				</div>

				<div class="form-group">
					<label for="avatar">
						Avatar
						<div v-if="avatarPreview">
							<img
								:src="avatarPreview"
								class="avatar-xlarge" />
						</div>
					</label>
					<input
						v-show="!avatarPreview"
						id="avatar"
						type="file"
						class="form-input"
						@change="handleImageUpload"
						accept="image/*" />
				</div>

				<div class="form-actions">
					<button
						type="submit"
						class="btn-blue btn-block">
						Register
					</button>
				</div>

				<div class="form-actions text-right">
					<router-link :to="{ name: 'SingInView' }">Enter to account</router-link>
				</div>
			</form>
			<div class="text-center push-top">
				<button class="btn-red btn-xsmall">
					<i class="fa fa-google fa-btn"></i>
					Sign up with Google
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import { useUsersStore } from '../stores/UsersStore'
	import { useRoute, useRouter } from 'vue-router'

	const usersStore = useUsersStore()
	const emit = defineEmits([''])
	const router = useRouter()

	let avatarPreview = ref(null)
	let user = {
		name: '',
		username: '',
		email: '',
		password: '',
		avatar: '',
	}

	async function register() {
		try {
			await usersStore.createUser(user)
			router.push({ name: 'HomeView' })
		} catch (error) {
			alert(error.message)
		}
	}

	function handleImageUpload(e) {
		user.avatar = e.target.files[0]
		const reader = new FileReader()
		reader.onload = (event) => {
			avatarPreview.value = event.target.result
		}
		reader.readAsDataURL(user.avatar)
		console.log(user.avatar)
	}
</script>
