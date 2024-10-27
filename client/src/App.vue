<template>
	<div class="flex flex-col h-screen">
		<Navbar />
		<div class="flex-grow m-4">
			<router-view />
		</div>
		<Footer />
	</div>
</template>

<script setup>
	import { onBeforeMount } from 'vue'
	import Navbar from './components/Navbar.vue'
	import Footer from './components/Footer.vue'
	import { useUsersStore } from './stores/UsersStore'

	const usersStore = useUsersStore()
</script>
