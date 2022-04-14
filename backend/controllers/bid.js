var express = require('express');
var router = express.Router();

/* GET users listing. */
// create new user
router.post('/', function(req, res, next) {
  try {
      const body = req.body;
      console.log(body);
      const result = await req.models.bid.postNewBid(body.land_id, body.land_owner, body.starting_bid);
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
      const result = await req.models.bid.updateBid(body.updated_bid, body.cur_user, body.cur_bud_id);
      res.status(201).json(result);
  } catch (err) {
      console.error('Failed to log in:', err);
      res.status(500).json({ message: err.toString() });
  }
});

module.exports = router;
