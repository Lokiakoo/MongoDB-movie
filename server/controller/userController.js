const User = require("../model/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const TOKEN_SECRET = "32D"
const TOKEN_TIME = "17000"


const userController = {
  /**
  *  User Login and return an authorized key
  *  @parm {object} req - username, password
  *  @parm {object} res - return the authorized key, information
  */
  auth(req, res) {
    const username = req.body.username
    try {
      User.findOne({ "username": username }, (err, result) => {
        if (err) {
          res.status(500).send({ "status": 500, "description": err })
        } else if (!result) {
          res.status(400).send({ "status": 400, "description": "Cannot find user" })
        } else if (req.body.username == result.username && bcrypt.compareSync(req.body.password, result.password)) {
          //---No bcrypt style---//
          //} else if (req.body.username == result.username && req.body.password == result.password) {
          //---If login successfully, update token to Database---//
          const token = jwt.sign({ "username": username }, TOKEN_SECRET, { expiresIn: parseInt(TOKEN_TIME) });
          res.header("auth_token", token).send({ "status": 201, "description": "Login successfully", "token": `${token}` })
          console.log(`${username} login, token: ${token}`)
          //---update token to Database---//
          User.updateOne({ "username": username }, { $set: { "expire_key": token } }, (err) => {
            if (err) return res.status(200).send(err.message)
          })
        } else {
          res.status(201).send({ "status": 201, "description": "Invalid username or password" })
        }
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({ "status": 500, "description": err })
    }
  },

  /**
  *  Customer / Staff creates new user account
  *  @parm {object} req - username, password, email
  *  @parm {object} res - return the information
  */
  async addUser(req, res) {
    console.log('Someone going to insert a user')
    try {
      const user = new User({
        username: req.body.username,     
        password: bcrypt.hashSync(req.body.password, 10),
        //---No bcrypt style---//
        //password: req.body.password,
        email: req.body.email,
        type: req.body.type
      })
      try {
        const result = await user.save()
        res.status(201).send({ "status": 201, "description": "User insert successfully", "Information": result })
      } catch (err) {
        res.status(500).send({ "status": 500, "description": err.message })
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({ "status": 500, "description": err })
    }
  },

  /**
  *  Customer / Staff update user account information
  *  @parm {object} req - username, password
  *  @parm {object} res - return the information
  */
  updateUser(req, res) {
    const username = req.body.username
    //---Also bcrypt before update to Mongo---//
    const password = bcrypt.hashSync(req.body.password, 10)
    console.log(`${username} request to update`)
    try {
      User.findOne({ "username": username }, (err, result) => {
        if (err) {
          res.status(500).send({ "status": 500, "description": err })
        } else if (!result) {
          res.status(400).send({ "status": 400, "description": "Cannot find user" })
        } else if (req.body.username == result.username) {
          //---No bcrypt style---//
          //User.updateOne({"username": username}, { $set : req.body }, (err, result) => { 
          //---bcrypt style---//
          User.updateOne({ "username": username }, { $set: req.body, password: password }, (err, result) => {
            if (err) return res.status(500).send(err.message)
            if (result) return res.status(201).send({ "status": 201, "description": "Data update successfully" })
          })
        } else {
          res.status(201).send({ "status": 201, "description": "Invalid username" })
        }
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({ "status": 500, "description": err })
    }
  },

  /**
  *  Disable a user account
  *  @parm {object} req - username
  *  @parm {object} res - return the information
  */

  removeUser(req, res) {
    const username = req.params.username
    console.log(`Someone request remove a user with username: ${username}`)
    try {
      User.findOneAndUpdate({ "username": username }, { $set: { username: "" } }, { runValidators: false }, (err, result) => {
        if (err) {
          res.status(500).send(err.message)
        } else if (!result) {
          res.status(400).send({ "status": 400, "description": "Cannot find user" })
        } else {
          res.status(201).send({ "status": 201, "description": "User delete successfully" })
          console.log(`${username} account have been disable`)
        }
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({ "status": 500, "description": err })
    }

  },

  /**
  *  User Logout 
  *  @parm {object} req - token
  *  @parm {object} res - return the information
  */
  logout(req, res) {
    const token = req.header("auth_token")
    //---decode then take the username from the JWT token---//
    const username = jwt.verify(token, TOKEN_SECRET).username
    try {
      User.find({ "username": username }, (err) => {
        if (err) {
          res.status(500).send({ "status": 500, "description": err })
        } else {
          //---Remove the key and response success---//
          User.updateOne({ expire_key: token }, { $set: { "expire_key": "" } }, (err) => {
            if (err) {
              res.status(500).send(err.message)
            } else {
              res.status(201).send({ "status": 201, "description": `${username} logout success` })
              console.log(`${username} logout success`)
            }
          })
        }
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({ "status": 500, "description": err })
    }
  }
}

module.exports = userController