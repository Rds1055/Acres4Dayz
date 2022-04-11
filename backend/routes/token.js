var express = require('express');
var router = express.Router();

/* GET users listing. */
// authenticate user
router.post('/', function(req, res, next) {
  try {
      const body = req.body;
      console.log(body);
      const result = await req.controllers.users.authenticateUser(body.username, body.password);
      res.status(201).json(result);
  } catch (err) {
      console.error('Failed to log in:', err);
      res.status(500).json({ message: err.toString() });
  }
});

module.exports = router;
