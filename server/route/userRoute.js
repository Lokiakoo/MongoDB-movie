const express = require("express")
const router = express.Router()
const userController = require("../controller/userController.js")
const messageController = require("../controller/messageController.js")
const verify = require("../validation/verifyToken")

router.post('/apply', userController.addUser)
router.post('/auth', userController.auth)
router.put('/update', verify, userController.updateUser)
router.delete('/removeuser/:username', verify, userController.removeUser)
router.post('/logout', verify, userController.logout)
router.post('/sendmessage', messageController.sendMessage)

router.use((req, res, next) => {
  console.log('Invalid access~')
  res.status(404).send({ 'status': 404, 'description': 'Endpoint not found' })
})

module.exports = router