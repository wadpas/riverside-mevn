<template>
	<TheNavbar />
	<div class="container">
		<div class="col-full push-top">
			<router-view />
		</div>
	</div>
</template>

<script setup>
	import TheNavbar from './components/TheNavbar.vue'
</script>
