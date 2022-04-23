const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await req.models.review.createReview(body);
        res.status(201).json(result);
    } catch (err) {
        console.error("Failed to create review:", err);
        res.status(500).json({message: err.toString()});
    }
    next();
});

router.get("/", async (req, res, next) => {
    try {
      const results = await req.models.review.getAllReviews();
      res.status(200).json(results);
    } catch (err) {
      console.error("Failed to get reviews:", err);
      res.status(500).json({message: err.message});
    }
    next();
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const results = await req.models.review.getReviewsById(id);
      res.status(200).json(results);
    } catch (err) {
      console.error("Failed to get reviews:", err);
      res.status(500).json({message: err.message});
    }
    next();
  });

  router.get("/owner/:username", async (req, res, next) => {
    try {
      const username = req.params.username;
      const results = await req.models.review.getReviewsByOwner(username);
      res.status(200).json(results);
    } catch (err) {
      console.error("Failed to get reviews:", err);
      res.status(500).json({message: err.message});
    }
    next();
  });

  router.get("/land/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const results = await req.models.review.getReviewsByLand(id);
      res.status(200).json(results);
    } catch (err) {
      console.error("Failed to get reviews:", err);
      res.status(500).json({message: err.message});
    }
    next();
  });
  
  router.get("/reviewer/:username", async (req, res, next) => {
    try {
      const username = req.params.username;
      const results = await req.models.review.getReviewsByReviewer(username);
      res.status(200).json(results);
    } catch (err) {
      console.error("Failed to get reviews:", err);
      res.status(500).json({message: err.message});
    }
    next();
  });

module.exports = router;