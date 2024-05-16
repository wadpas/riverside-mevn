const express = require('express')
const app = express()
const forums = require('./routes/forums')
const posts = require('./routes/posts')
const threads = require('./routes/threads')
const users = require('./routes/users')

const connectDB = require('./db/connect')
require('dotenv').config()
const port = 5000

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.use('/api/v1/forums', forums)
app.use('/api/v1/posts', posts)
app.use('/api/v1/threads', threads)
app.use('/api/v1/users', users)

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
	} catch (error) {
		console.log(error)
	}
}

start()
