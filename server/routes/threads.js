const express = require('express')
const router = express.Router()
const { getThreads, createThread, getThread, updateThread, deleteThread } = require('../controllers/threads')

router.route('/').get(getThreads).post(createThread)
router.route('/:id').get(getThread).patch(updateThread).delete(deleteThread)

module.exports = router
