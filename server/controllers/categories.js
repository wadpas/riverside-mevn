const Category = require('../models/category')
const asyncWrapper = require('../middleware/async')

const getCategories = asyncWrapper(async (req, res) => {
	const category = await Category.find({})
	res.status(200).json(category)
})

const createCategory = asyncWrapper(async (req, res) => {
	const category = await Category.create(req.body)
	res.status(201).json(category)
})

const getCategory = asyncWrapper(async (req, res) => {
	const { id } = req.params
	const category = await Category.findById({ _id: id })
	if (!category) {
		return res.status(404).json(`Category ${id} not found`)
	}
	res.status(200).json(category)
})
const updateCategory = asyncWrapper(async (req, res) => {
	const { id } = req.params
	const category = await Category.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidation: true })
	if (!category) {
		return res.status(404).json(`Category ${categoryId} not found`)
	}
	res.status(200).json({ category })
})

const deleteCategory = asyncWrapper(async (req, res) => {
	res.send('Delete category')
})

module.exports = {
	getCategories,
	createCategory,
	getCategory,
	updateCategory,
	deleteCategory,
}
