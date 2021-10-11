
const express = require('express');
const router = express.Router();
//const db = require('./../db');
//const { v4: uuidv4 } = require('uuid');
const Concert = require('../models/concerts.model');



  router.get('/concerts', async (req, res) => {
    try {
      res.json(await Concert.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  });
  


  router.get('/concerts/:id', async (req, res) => {

    try {
      const dep = await Concert.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  });
  
  router.post('/concerts', async (req, res) => {

    try {
  
      const { performer, genre, price, day, image } = req.body;
      const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
      await newConcert.save();
      res.json({ message: 'OK' });
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
  
  });

  router.put('/concerts/:id', async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
  
    try {
      const dep = await Concert.findById(req.params.id);
      if(dep) {
        await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image  }});
        res.json({ message: 'OK', dep  });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  });
  
  router.delete('/concerts/:id', async (req, res) => {

    try {
      const dep = await Concert.findById(req.params.id);
      if(dep) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK', dep });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  });
  

module.exports = router;