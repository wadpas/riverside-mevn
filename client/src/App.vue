<template>
	<TheNavbar />
	<div class="container">
		<div class="col-full push-top">
			<router-view />
		</div>
	</div>
</template>

<script setup>
	import { onBeforeMount } from 'vue'
	import TheNavbar from './components/TheNavbar.vue'
	import { useUsersStore } from './stores/UsersStore'

	const usersStore = useUsersStore()

	onBeforeMount(async () => {
		usersStore.fetchUser()
	})
</script>
