
const express = require('express');
const router = express.Router();
//const db = require('./../db');
//const { v4: uuidv4 } = require('uuid');
const TestimonialController = require('../controllers/testimonials.controller');


  router.get('/testimonials', TestimonialController.getAll);
  
  router.get('/testimonials/random', TestimonialController.getRandom);

  router.get('/testimonials/:id', TestimonialController.getById);
  
  router.post('/testimonials', TestimonialController.post);

  router.put('/testimonials/:id', TestimonialController.put);
  
  router.delete('/testimonials/:id', TestimonialController.delete);
  


module.exports = router;