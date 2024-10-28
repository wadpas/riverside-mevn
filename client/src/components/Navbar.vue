<template>
	<nav class="bg-white shadow">
		<div class="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
			<router-link :to="{ name: 'home' }">
				<img
					src="../assets/riverside.svg"
					class="h-8"
					alt="Riverside Logo" />
			</router-link>
			<button
				data-collapse-toggle="navbar-default"
				type="button"
				class="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
				aria-controls="navbar-default"
				aria-expanded="false">
				<span class="sr-only">Open main menu</span>
				<svg
					class="w-5 h-5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 17 14">
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 1h15M1 7h15M1 13h15" />
				</svg>
			</button>
			<div
				class="hidden w-full md:block md:w-auto"
				id="navbar-default">
				<ul
					class="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
					<li>
						<router-link
							:to="{ name: 'home' }"
							activeClass="bg-orange-400 rounded text-white"
							class="block px-3 py-1 text-gray-900 rounded hover:bg-orange-500 md:hover:bg-transparent md:border-0 md:hover:text-orange-500">
							Home
						</router-link>
					</li>
					<li>
						<router-link
							:to="{ name: 'all' }"
							activeClass="bg-orange-400 rounded text-white"
							class="block px-3 py-1 text-gray-900 rounded hover:bg-orange-500 md:hover:bg-transparent md:border-0 md:hover:text-orange-500">
							Blog
						</router-link>
					</li>
					<li>
						<router-link
							:to="{ name: 'new' }"
							activeClass="bg-orange-400 rounded text-white"
							class="block px-3 py-1 text-gray-900 rounded hover:bg-orange-500 md:hover:bg-transparent md:border-0 md:hover:text-orange-500">
							Create
						</router-link>
					</li>
					<li>
						<router-link
							:to="{ name: 'about' }"
							activeClass="bg-orange-400 rounded text-white"
							class="block px-3 py-1 text-gray-900 rounded hover:bg-orange-500 md:hover:bg-transparent md:border-0 md:hover:text-orange-500">
							About
						</router-link>
					</li>
					<li>
						<router-link
							:to="{ name: 'login' }"
							activeClass="bg-orange-400 rounded text-white"
							class="block px-3 py-1 text-gray-900 rounded hover:bg-orange-500 md:hover:bg-transparent md:border-0 md:hover:text-orange-500">
							Login
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script setup></script>
