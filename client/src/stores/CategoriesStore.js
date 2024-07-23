import axios from 'axios'
import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('CategoriesStore', {
	state: () => ({
		categories: [],
	}),
	actions: {
		async fetchCategories() {
			if (this.categories.length) return
			await axios.get('/categories').then((res) => {
				this.categories = res.data.categories
			})
		},
	},
})
