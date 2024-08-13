const express = require('express')
const router = express.Router()
const { getForums, createForum, getForum, updateForum, deleteForum } = require('../controllers/forums')

router.route('/').get(getForums).post(createForum)
router.route('/:id').get(getForum).patch(updateForum).delete(deleteForum)

module.exports = router
