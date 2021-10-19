const Seat = require('../models/seats.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
      res.json(await Seat.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

exports.getById = async (req, res) => {

    try {
      const dep = await Seat.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };

exports.post = async (req, res) => {

    try {
  
      const { day, seat, client, email } = req.body;
      const cleanClient = sanitize(client);
      const cleanEmail = sanitize(email);
      const cleanSeat = sanitize(seat);
      const cleanDay = sanitize(day);
      const newSeat = new Seat({ day: cleanDay, seat: cleanSeat, client: cleanClient, email: cleanEmail });
      await newSeat.save();
      res.json({ message: 'OK' });
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
  
  };

exports.put = async (req, res) => {
    const { day, seat, client, email } = req.body;
    try {
      const {id} = req.params.id;
      const dep = await Seat.findById(id);
      if(dep) {
        await Seat.updateOne({ _id: id }, { $set: { day, seat, client, email  }});
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
      const dep = await Seat.findById(id);
      if(dep) {
        await Seat.deleteOne({ _id: id });
        res.json({ message: 'OK', dep });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
