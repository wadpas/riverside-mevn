const express = require('express')
const cors = require('cors')
const forums = require('./routes/forums')
const posts = require('./routes/posts')
const threads = require('./routes/threads')
const users = require('./routes/users')
const categories = require('./routes/categories')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
require('dotenv').config()

const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

app.use('/api/v1/forums', forums)
app.use('/api/v1/posts', posts)
app.use('/api/v1/threads', threads)
app.use('/api/v1/users', users)
app.use('/api/v1/categories', categories)
app.use(notFound)

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
	} catch (error) {
		console.log(error)
	}
}

start()
