const Testimonial = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Testimonial.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getRandom = async (req, res) => {

    try {
      const count = await Testimonial.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Testimonial.findOne().skip(rand);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };

  exports.getById = async (req, res) => {

    try {
      const dep = await Testimonial.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };

  exports.post = async (req, res) => {

    try {
  
      const { author, text } = req.body;
      const newTestimonial = new Testimonial({ author, text });
      await newTestimonial.save();
      res.json({ message: 'OK' });
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
  
  };

  exports.put = async (req, res) => {
    const { author, text } = req.body;
  
    try {
      const {id} = req.params.id;
      const dep = await Testimonial.findById(id);
      if(dep) {
        await Testimonial.updateOne({ _id: id }, { $set: { author, text  }});
        res.json({ message: 'OK', dep  });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };

  exports.delete = async (req, res) => {

    try {
      const {id} = req.params.id;
      const dep = await Testimonial.findById(id);
      if(dep) {
        await Testimonial.deleteOne({ _id: id });
        res.json({ message: 'OK', dep });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };