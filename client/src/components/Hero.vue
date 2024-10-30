<template>
	<section class="flex flex-row bg-white rounded-lg dark:bg-gray-900">
		<div class="w-1/2">
			<img
				class="object-fill rounded"
				src="/hero/reviews.jpg"
				alt="" />
		</div>
		<div class="content-center w-1/2 px-4 py-8 mx-auto text-center lg:py-16">
			<p class="mb-8 text-lg font-normal lg:text-xl sm:px-8 lg:px-24 dark:text-gray-400">
				A film, also called a movie, motion picture, moving picture, picture, photoplay, or flick
			</p>
			<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
				<router-link
					:to="{ name: 'all' }"
					class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
					Reviews
					<svg
						class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10">
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M1 5h12m0 0L9 1m4 4L9 9" />
					</svg>
				</router-link>
				<a
					href="https://en.wikipedia.org/wiki/Film"
					class="px-5 py-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:ms-4 focus:outline-none hover:bg-gray-100 hover:text-red-600 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
					Learn more
				</a>
			</div>
		</div>
	</section>
	<section class="flex flex-row bg-white rounded-lg dark:bg-gray-900">
		<div class="content-center w-1/2 px-4 py-8 mx-auto text-center lg:py-16">
			<p class="mb-8 text-lg font-normal lg:text-xl sm:px-8 lg:px-24">
				Film criticism is the analysis and evaluation of films and the film medium
			</p>
			<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
				<router-link
					:to="{ name: 'about' }"
					class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
					About Us
					<svg
						class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10">
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M1 5h12m0 0L9 1m4 4L9 9" />
					</svg>
				</router-link>
				<a
					href="https://en.wikipedia.org/wiki/Film_criticism"
					class="px-5 py-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:ms-4 focus:outline-none hover:bg-gray-100 hover:text-red-600 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
					Learn more
				</a>
			</div>
		</div>
		<div class="w-1/2">
			<img
				class="object-fill rounded"
				src="/hero/about.jpg"
				alt="" />
		</div>
	</section>
</template>

<script setup></script>
