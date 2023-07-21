
const axios = require("axios")
const Film = require("../model/filmModel")
const readline = require('readline-sync')
const apikey = "cde077bc" // OMDb apikey

const filmController = {
  /**
  *  Get the film information from OMDb API
  *  @parm {object} req - OMDb API key
  *  @parm {object} req - the film name
  *  @parm {object} res - return the film information from OMDb
  */
  async getOMDB(req, res) {
    console.log(`Someone request film information from OMDb`)
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${apikey}&t=${req.params.title}`
      )
      res.status(200).send(response.data)
    } catch (error) {
      res.send(error)
    }
  },

  /**
  *  Create a record to the shop based on the information in the database with Authorized Key
  *  @parm {object} req - title name, rated, actor must need, the other is options
  *  @parm {object} res - return the information
  */
  async addFilm(req, res) {
    console.log(`Someone request add film`)

    try {

      const filmCount = await Film.countDocuments()
      const nextID = (filmCount + 1)

      const film = new Film({
        title: req.body.title, //required
        rated: req.body.rated, //required
        director: req.body.director,
        actors: req.body.actors, //required
        genre: req.body.genre, //required
        year: req.body.year, //required
        released: req.body.released,
        writer: req.body.writer,
        runtime: req.body.runtime,
        awards: req.body.awards,
        poster: req.body.poster,
        price: req.body.price, //required
        id: nextID //auto gen
      })
      try {
        const result = await film.save()
        res.status(201).send({ "status": 201, "description": "Film insert successfully", "Information": result })
      } catch (err) {
        res.status(500).send({ "status": 500, "description": err.message })
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({ "status": 500, "description": err })
    }
  },

  /**
  *  Create a record to the shop based on the information in the
  *  database with Authorized Key
  *  @parm {object} req - the film name
  *  @parm {object} res - return the film information in database
  */
  getFilm(req, res) {
    const film = req.params.film
    console.log(`Someone request film information with filmname: ${film}`)
    try {
      Film.find({ 'title': film }, (err, result) => {
        if (err) {
          res.status(500).send({ "status": 500, "description": err })
        } else if (result[0] == null) {
          res.status(200).send({ "status": 200, "description": "Movie not found" })
        } else {
          res.status(200).send(result)
        }
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({ "status": 500, "description": err })
    }
  },

  /**
  *  List ALL film information from the database
  *  @parm {object} req - nothing
  *  @parm {object} res - return all film information in database
  */
  listFilm(req, res) {
    console.log(`Someone request all film information`)
    try {
      Film.find({}, (err, result) => {
        if (err) {
          res.status(500).send({ "status": 500, "description": err })
        } else {
          res.status(200).send(result)
        }
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({ "status": 500, "description": err })
    }
  },

  /**
  *  Remove a film record
  *  @parm {object} req - the film name
  *  @parm {object} res - return the information
  */
  removeFilm(req, res) {
    const film = req.params.film
    console.log(`Someone request remove a film with filmname: ${film}`)
    try {
      Film.deleteOne({ 'title': film }, (err) => {
        if (err) {
          res.status(500).send({ "status": 500, "description": err })
        } else {
          res.status(200).send({ "status": 200, "description": "Film delete successfully" })
        }
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({ "status": 500, "description": err })
    }
  },

  /**
  *  Leave a comment and score a movie
  *  @parm {object} req - film name
  *  @parm {integer} req - score
  *  @parm {string} req - comment
  *  @parm {object} res - return the information
  */
  comment(req, res) {
    console.log('Someone leave a comment')
    try {
      const film = String(readline.question('Enter the film name: '))
      const score = Number(readline.question('Movie score 1-10: '))
      validateScore(score)
      const comment = String(readline.question('Please leave your comments and inquiry here : '))
      res.status(200).send(`Thank you. You gave ${film} a rating of ${score}/10 with the comment "${comment}"`)
    } catch (err) {
      console.log(`${err.name} thrown`)
      console.log(`The error message is: ${err.message}`)
      console.log(err.stack)
    }

    function validateScore(score) {
      const minScore = 0
      const maxScore = 10
      if (Number.isNaN(score) || score % 1 !== minScore) {
        throw new TypeError('parameter is not a valid integer')
      }
      if (score < 1 || score > maxScore) {
        throw new RangeError('parameter should be in the range 1-10')
      }
      return true
    }
  },

  /**
  *  Search a movie with keyword
  *  @parm {object} req - keyword
  *  @parm {object} res - return the information
  */
  searchKeyword(req, res) {
    const keyword = req.params.keyword
    console.log(`Someone request film title with keyword: ${keyword}`)
    try {
      Film.find({ 'title': new RegExp(keyword, 'i') }, (err, result) => {
        if (err) {
          res.status(500).send({ "status": 500, "description": err })
        } else if (result[0] == null) {
          res.status(200).send({ "status": 200, "description": "There is no film with this keyword" })
        } else {
          res.status(200).send(result)
        }
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({ "status": 500, "description": err })
    }
  },

  /**
  *  Search a movie with type
  *  @parm {object} req - keyword
  *  @parm {object} res - return the information
  */
  filmType(req, res) {
    const keyword = req.params.keyword
    console.log(`Someone request film title with keyword: ${keyword}`)
    try {
      Film.find({ 'genre': new RegExp(keyword, 'i') }, (err, result) => {
        if (err) {
          res.status(500).send({ "status": 500, "description": err })
        } else if (result?.[0]?.['title'] == null) {
          res.status(200).send({ "status": 200, "description": "There is no film tpye with this keyword" })
        } else {
          res.status(200).send(result)
        }
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({ "status": 500, "description": err })
    }
  },

  /**
  *  Count total films in database
  *  @parm {object} req - nothing
  *  @parm {object} res - return the information
  */
  filmCount(req, res) {
    console.log("Someone request film count")
    const filmCount = Film.countDocuments({}, (err, result) => {
      if (err) {
        res.status(500).send({ "status": 500, "description": err })
      } else {
        res.status(200).send({ "status": 200, "description": `There are total ${result} film` })
      }
    })
  },

  /**
  *  This is the information about this RESTful web service
  *  @parm {object} req - nothing
  *  @parm {object} res - return the information
  */
  aboutUs(req, res) {
    res.status(200).send("This is a RESTful web backend server for https://demo-movie.pages.dev for display a demo pages.And this pages is for fetch info passes the HTTP request and response return the information")
  },
}

module.exports = filmController