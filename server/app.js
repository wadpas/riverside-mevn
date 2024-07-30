require('dotenv').config()
require('express-async-errors')

const helmet = require('helmet')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')
const express = require('express')
const authRouter = require('./routes/auth')
const forums = require('./routes/forums')
const posts = require('./routes/posts')
const threads = require('./routes/threads')
const users = require('./routes/users')
const categories = require('./routes/categories')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const authMid = require('./middleware/auth')

const app = express()
const port = 5000

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
		standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	})
)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/forums', authMid, forums)
app.use('/api/v1/posts', authMid, posts)
app.use('/api/v1/threads', authMid, threads)
app.use('/api/v1/users', authMid, users)
app.use('/api/v1/categories', authMid, categories)
app.use(notFound)
app.use(errorHandler)

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
	} catch (error) {
		console.log(error)
	}
}

start()
