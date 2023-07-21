const express = require("express")
const filmRoute = require("./server/route/filmRoute")
const userRoute = require("./server/route/userRoute")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const mongo_username = process.env['mongo_username'] // update your username in secrets
const mongo_password = process.env['mongo_password'] // update your password in secrets
const mongo_collection = process.env['mongo_collection'] // update your conllection name in secrets
const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.diric2s.mongodb.net/${mongo_collection}?retryWrites=true&w=majority`


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose.set('runValidators', true)
mongoose.set('strictQuery', true)
mongoose.connect(CONNECTION_URI, () => {
  console.log("MONGO DB connected")
},
  e => console.log(e)
)

app.get('/', (req, res, next) => {
  res.redirect('/film/about-us')
})
app.use('/film', filmRoute)
app.use('/user', userRoute)
app.use((req, res, next) => {
  console.log('Invalid access~')
  res.status(404).send({ 'status': 404, 'description': 'Endpoint not found' })
})

const listener = app.listen(process.env.PORT || 12355, () => {
  console.log(`Server is ready at ${listener.address().port}`)
})
