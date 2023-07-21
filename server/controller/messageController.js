const Message = require("../model/messageModel")

const userController = {

  async sendMessage(req, res) {
    try{
      const message = new Message({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
        })
      try {
        const result = await message.save()
        res.status(201).send({ "status": 201, "description": "Message submit successfully", "Information": result })
        console.log('Someone leave a message')
        } catch (err) {
        res.status(500).send({ "status": 500, "description": err.message })
        }
      } catch (err) {
      console.log(err)
      res.status(500).send({ "status": 500, "description": err })
      }   
  }
}

module.exports = userController
