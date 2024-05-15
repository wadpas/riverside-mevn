const getMovies = (req, res) => {
	res.send('All movies')
}

const createMovie = (req, res) => {
	res.json(req.body)
}

const getMovie = (req, res) => {
	res.json({ id: req.params.id })
}

const updateMovie = (req, res) => {
	res.send('Update movie')
}

const deleteMovie = (req, res) => {
	res.send('Delete movie')
}

module.exports = {
	getMovies,
	createMovie,
	getMovie,
	updateMovie,
	deleteMovie
}
