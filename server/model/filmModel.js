const mongoose = require('mongoose')

const filmSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    rated: { type: String, required: true },
    actors: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: String, required: true },
    price: { type: Number, required: true },
    id: {type: Number, required: true },
    director: { type: String, required: false },
    released: { type: String, required: false },
    writer: { type: String, required: false },
    runtime: { type: String, required: false },
    awards: { type: String, required: false },
    poster: { type: String, required: false },
  }, { timestamps: true }
)

module.exports = mongoose.model("Film", filmSchema)