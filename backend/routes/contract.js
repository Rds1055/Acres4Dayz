const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await req.models.contract.createContract(body);
        res.status(201).json(result);
    } catch (err) {
        console.error("Failed to create contract:", err);
        res.status(500).json({message: err.toString()});
    }
    next();
});

router.get("/", async (req, res, next) => {
    try {
      const results = await req.models.contract.getAllContracts();
      res.status(200).json(results);
    } catch (err) {
      console.error("Failed to get contracts:", err);
      res.status(500).json({message: err.message});
    }
    next();
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const results = await req.models.contract.getContractsById(id);
      res.status(200).json(results);
    } catch (err) {
      console.error("Failed to get contracts:", err);
      res.status(500).json({message: err.message});
    }
    next();
  });

  router.get("/owner/:username", async (req, res, next) => {
    try {
      const username = req.params.username;
      const results = await req.models.contract.getContractsByOwner(username);
      res.status(200).json(results);
    } catch (err) {
      console.error("Failed to get contracts:", err);
      res.status(500).json({message: err.message});
    }
    next();
  });
  
  router.get("/renter/:username", async (req, res, next) => {
    try {
      const username = req.params.username;
      const results = await req.models.contract.getContractsByRenter(username);
      res.status(200).json(results);
    } catch (err) {
      console.error("Failed to get contracts:", err);
      res.status(500).json({message: err.message});
    }
    next();
  });

module.exports = router;