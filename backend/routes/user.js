var express = require('express');
var router = express.Router();

/* GET users listing. */
// create new user
router.post('/', async(req, res, next) => {
  try {
      const body = req.body;
      // console.log(body);
      //const result = await req.controllers.users.createNewUser(body.username, body.password);
      const result = await req.models.user.createNewUser(body);
      res.status(201).json(result);
  } catch (err) {
      console.error('Failed to create account:', err);
      res.status(500).json({ message: err.toString() });
  }
  next();
});
// find user by username
router.get('/:username', async(req, res, next) => {
  try {
      const user = req.params.username;
      // console.log(user);
      const result = await req.models.user.findUserByUsername(user);
      //const result = await req.controllers.users.getUsername(body.username);
      res.status(200).json(result);
  } catch (err) {
      console.error('Failed to find user:', err);
      res.status(500).json({ message: err.toString() });
  }
  next();
});
// find all users
router.get('/', async(req, res, next) => {
  try {
      const result = await req.models.user.getAllUsers();
      //const result = await req.controllers.users.getUsername(body.username);
      res.status(200).json(result);
  } catch (err) {
      console.error('Failed to find users:', err);
      res.status(500).json({ message: err.toString() });
  }
  next();
});
// update user info
router.put('/:username', async (req, res, next) => {
  try {
      const user = req.params.username;
      const body = req.body;
      // console.log(body);
      const result = await req.models.user.updateUserData(user, body);
      //const result = await req.controllers.users.updateUserData(body.email, body.phone, body.image);
      res.status(201).json(result);
  } catch (err) {
      console.error('Failed to log in:', err);
      res.status(500).json({ message: err.toString() });
  }
  next();
});

router.delete('/:username', async (req, res, next) => {
  try {
    const user = req.params.username;
    const result = await req.models.user.deleteUser(user);
    res.status(204).end();
  } catch (err) {
    console.error('Failed to delete user:', err);
    res.status(500).json({message: err.toString()});
  }
  next();
});

module.exports = router;
