const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(cors());


const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
    { id: 3, author: 'Krzysz Tob', text: 'This company is worth every coin!' },
    { id: 4, author: 'Zdzislaw Dzik', text: 'They really know how to make you happy.' },
    { id: 5, author: 'Jan Lol', text: 'This company is worth every coin!' },
    { id: 6, author: 'Wojte Dyg', text: 'They really know how to make you happy.' },
    { id: 7, author: 'Marcin Caban', text: 'This company is worth every coin!' },
    { id: 8, author: 'Andrzej Byc', text: 'They really know how to make you happy.' },
  ];


const getTestimonialFromLink = (req) => (
    db.find(testimonial => testimonial.id === parseInt(req.params.id))
  );
  
  app.get('/testimonials', (req, res) => {
    res.json(db);
  });
  
  app.get('/testimonials/random', (req, res) => {
    res.json(db[Math.floor(Math.random() * db.length)]);
  });
  
  app.get('/testimonials/:id', (req, res) => {
    res.json(getTestimonialFromLink(req));
  });


  app.post('/testimonials', (req, res) => {
    const { author, text } = req.body;
    const newTestimonial = { id: uuidv4(), author: author, text: text };
    db.push(newTestimonial);
    res.send( { message: 'OK' } );
  });
  
  app.put('/testimonials/:id', (req, res) => {
    const { author, text } = req.body;
    getTestimonialFromLink(req).author = author;
    getTestimonialFromLink(req).text = text;
    res.send( { message: 'OK' } );
  });
  
  app.delete('/testimonials/:id', (req, res) => {
    db.splice(db.indexOf(getTestimonialFromLink(req)), 1);
    res.send( { message: 'OK' } );
  });

app.use((req, res) => {
    res.status(404).send( { message: '404 not found...'});
  })

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});