const express = require("express")
const router = express.Router()
const filmController = require("../controller/filmController.js")
const verify = require("../validation/verifyToken")

router.get('/filmcord/:title', filmController.getOMDB)
router.post('/film', filmController.addFilm) //
router.get('/film/:film', filmController.getFilm)
router.get('/list', filmController.listFilm) //
router.delete('/removefilm/:film', filmController.removeFilm) //
router.post('/comment', filmController.comment)
router.get('/searchkeyword/:keyword', filmController.searchKeyword)
router.get('/filmtype/:keyword', filmController.filmType)
router.get('/count', filmController.filmCount)
router.get('/about-us', filmController.aboutUs)

router.use((req, res, next) => {
  console.log('Invalid access~')
  res.status(404).send({ 'status': 404, 'description': 'Endpoint not found' })
})

module.exports = router