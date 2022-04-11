var express = require('express');
var router = express.Router();

/* GET users listing. */
// create new user
router.post('/', function(req, res, next) {
  try {
      const body = req.body;
      console.log(body);
      //const result = await req.controllers.users.createNewUser(body.username, body.password);
      res.status(201).json(result);
  } catch (err) {
      console.error('Failed to log in:', err);
      res.status(500).json({ message: err.toString() });
  }
});
// find user by username
router.get('/', function(req, res, next) {
  try {
      const body = req.body;
      console.log(body);
      //const result = await req.controllers.users.getUsername(body.username);
      res.status(201).json(result);
  } catch (err) {
      console.error('Failed to log in:', err);
      res.status(500).json({ message: err.toString() });
  }
});
// update user info
router.put('/', function(req, res, next) {
  try {
      const body = req.body;
      console.log(body);
      //const result = await req.controllers.users.updateUserData(body.email, body.phone, body.image);
      res.status(201).json(result);
  } catch (err) {
      console.error('Failed to log in:', err);
      res.status(500).json({ message: err.toString() });
  }
});

module.exports = router;
