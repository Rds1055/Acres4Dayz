var express = require('express');
var router = express.Router();

/* GET users listing. */
// create new user
router.post('/', async (req, res, next) => {
  try {
      const body = req.body;
      console.log(body);
      const result = await req.models.bid.createNewBid(body);
      res.status(201).json(result);
  } catch (err) {
      console.error('Failed to create bid:', err);
      res.status(500).json({ message: err.toString() });
  }
  next();
});
// update user info
router.put('/:id', async (req, res, next) => {
  try {
      const id = req.params.id;
      const body = req.body;
      console.log(body);
      const result = await req.models.bid.updateBid(id, body);
      res.status(200).json(result);
  } catch (err) {
      console.error('Failed to edit bid:', err);
      res.status(500).json({ message: err.toString() });
  }
  next();
});

router.get("/", async (req, res, next) => {
  try {
    const results = await req.models.bid.getAllBids();
    res.status(200).json(results);
  } catch (err) {
    console.error("Failed to get bids:", err);
    res.status(500).json({message: err.message});
  }
  next();
});

router.get("/land/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const results = await req.models.bid.getBidsByLand(id);
    res.status(200).json(results);
  } catch (err) {
    console.error("Failed to get bids:", err);
    res.status(500).json({message: err.message});
  }
  next();
});

router.get("/owner/:username", async (req, res, next) => {
  try {
    const username = req.params.username;
    const results = await req.models.bid.getBidsByOwner(username);
    res.status(200).json(results);
  } catch (err) {
    console.error("Failed to get bids:", err);
    res.status(500).json({message: err.message});
  }
  next();
});

router.get("/bidder/:username", async (req, res, next) => {
  try {
    const username = req.params.username;
    const results = await req.models.bid.getBidsByBidder(username);
    res.status(200).json(results);
  } catch (err) {
    console.error("Failed to get bids:", err);
    res.status(500).json({message: err.message});
  }
  next();
});

module.exports = router;
