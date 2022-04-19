var express = require('express');
var router = express.Router();

/* GET users listing. */
// create new user
router.post('/', async(req, res, next) => {
  try {
      const body = req.body;
      console.log(body);
      //const result = await req.controllers.users.createNewUser(body.username, body.password);
      const result = await req.models.user.createNewUser(body);
      res.status(201).json(result);
  } catch (err) {
      console.error('Failed to log in:', err);
      res.status(500).json({ message: err.toString() });
  }
  next();
});
// find user by username
router.get('/', async(req, res, next) => {
  try {
      const body = req.body;
      console.log(body);
      //const result = await req.controllers.users.getUsername(body.username);
      res.status(201).json(result);
  } catch (err) {
      console.error('Failed to log in:', err);
      res.status(500).json({ message: err.toString() });
  }
  next();
});
// update user info
router.put('/', async (req, res, next) => {
  try {
      const body = req.body;
      console.log(body);
      //const result = await req.controllers.users.updateUserData(body.email, body.phone, body.image);
      res.status(201).json(result);
  } catch (err) {
      console.error('Failed to log in:', err);
      res.status(500).json({ message: err.toString() });
  }
  next();
});

module.exports = router;
