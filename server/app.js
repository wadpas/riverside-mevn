const express = require('express')
const app = express()
const movies = require('./routes/movies')
const connectDB = require('./db/connect')
require('dotenv').config()
const port = 5000

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.use('/api/v1/movies', movies)

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
	} catch (error) {
		console.log(error)
	}
}

start()
