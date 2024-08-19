<template>
	<div class="profile-card">
		<form @submit.prevent="save">
			<p class="text-center avatar-edit">
				<label for="avatar">
					<img
						:src="activeUser?.avatar"
						:alt="`{activeUser.name} profile picture`"
						class="avatar-xlarge img-update" />
					<div class="avatar-upload-overlay">
						<fa
							icon="camera"
							size="3x"
							:style="{ color: 'white', opacity: '8' }" />
					</div>
					<input
						v-show="false"
						type="file"
						id="avatar"
						accept="image/*"
						@change="handleAvatarUpload" />
				</label>
			</p>

			<div class="form-group">
				<input
					v-model="activeUser.username"
					type="text"
					placeholder="Username"
					class="form-input text-lead text-bold" />
			</div>

			<div class="form-group">
				<input
					v-model="activeUser.name"
					type="text"
					placeholder="Full Name"
					class="form-input text-lead" />
			</div>

			<div class="form-group">
				<label for="user_bio">Bio</label>
				<textarea
					v-model="activeUser.bio"
					class="form-input"
					id="user_bio"
					placeholder="Write a few words about yourself."></textarea>
			</div>

			<div class="stats">
				<span>{{ posts?.length }} posts</span>
				<span>{{ threads?.length }} threads</span>
			</div>

			<hr />

			<div class="form-group">
				<label
					class="form-label"
					for="user_website">
					Website
				</label>
				<input
					v-model="activeUser.website"
					autocomplete="off"
					class="form-input"
					id="user_website"
					value="batman.com" />
			</div>

			<div class="form-group">
				<label
					class="form-label"
					for="user_email">
					Email
				</label>
				<input
					v-model="activeUser.email"
					autocomplete="off"
					class="form-input"
					id="user_email"
					value="joker@batmail.com" />
			</div>

			<div class="form-group">
				<label
					class="form-label"
					for="user_location">
					Location
				</label>
				<input
					v-model="activeUser.location"
					autocomplete="off"
					class="form-input"
					id="user_location"
					value="You wish!" />
			</div>

			<div class="btn-group space-between">
				<button
					class="btn-ghost"
					@click="cancel">
					Cancel
				</button>
				<button
					type="submit"
					class="btn-blue">
					Save
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
	import { useUsersStore } from '../stores/UsersStore'
	import { useRoute, useRouter } from 'vue-router'

	const usersStore = useUsersStore()
	const router = useRouter()

	const props = defineProps({
		activeUser: Object,
		posts: Array,
		threads: Array,
	})

	async function handleAvatarUpload(e) {
		const file = e.target.files[0]
		props.activeUser.avatar = await usersStore.updateUserAvatar(file)
	}

	async function save() {
		usersStore.updateUser()
		router.push({ name: 'ProfileView' })
	}

	function cancel() {
		router.push({ name: 'ProfileView' })
	}
</script>

<style lang="scss" scoped></style>
