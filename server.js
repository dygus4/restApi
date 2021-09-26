const express = require('express');
const path = require('path')
const db = require('./db.js');
var cors = require('cors')

const app = express();

app.use(cors())

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', testimonialsRoutes); 
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes); 



app.use((req, res) => {
    res.status(404).send( { message: '404 not found...'});
  })

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});