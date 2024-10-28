const express = require('express')
const router = express.Router()
const { getMovies, createForum, getForum, updateForum, deleteForum } = require('../controllers/movies')

router.route('/').get(getMovies).post(createForum)
router.route('/:id').get(getForum).patch(updateForum).delete(deleteForum)

module.exports = router
