var express = require('express');
var router = express.Router();
const controller = require("../controllers/user");
const auth = require("../middleware/auth");

/* GET users listing. */
// authenticate user
router.post('/', async (req, res, next) => {
  try {
      const body = req.body;
      const result = await controller.authenticateUser(body.username, body.password);
      if (result === null) {
        res.status(401).json({message: "Invalid credentials"});
      } else {
        res.status(201).json(result);
      }
  } catch (err) {
      console.error('Failed to log in:', err);
      res.status(401).json({ message: err.toString() });
  }
  next();
});

router.get('/', auth.authenticateJWT, async (req, res, next) => {
  try {
    const username = req.user.username;
    const result = await req.models.user.findUserByUsername(username);
    res.status(200).json(result);
  } catch (err) {
    console.error("Failed to get session:", err);
    res.status(500).json({message: err.toString()});
  }
});

module.exports = router;
