const express = require('express');
const Quote = require('../models/quotes');

const app = express();

// function add quote

function addrecord(req, res) {
  const q = new Quote(req.body);

  try {
    q.save();
    res.render('user/quote.handlebars', { title: 'Input quote successful' });
  } catch {
    const funct = (error) => {
      res.status(500).send(error);
    };
    funct();
  }
}

// function update

function updaterecord(req, res) {
  Quote.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err) => {
    if (!err) {
      res.redirect('/quotes/list');
    } else {
      console.log(err);
      res.render('user/add.handlebars', {
        title: 'Error update',
      });
    }
  });
}

// api get form input

app.get('/', (req, res) => {
  res.render('user/quote.handlebars', { title: 'Form input' });
});

// api post quote

app.post('/add', async (req, res) => {
  if (req.body.id === '') {
    addrecord(req, res);
  } else {
    updaterecord(req, res);
  }
});

// api get list

app.get('/list', (req, res) => {
  Quote.find({}).then((quotes) => {
    res.render('user/list.handlebars',
      { quotes: quotes.map((quote) => quote.toJSON()) });
  });
});

// api edit quote

app.get('/edit/:id', (req, res) => {
  Quote.findById(req.params.id, (err, q) => {
    if (!err) {
      res.render('user/quote.handlebars', {
        title: 'Update quote',
        q: q.toJSON(),
      });
    }
  });
});

// api delete quote

app.get('/delete/:id', async (req, res) => {
  try {
    const qd = await Quote.findByIdAndDelete(req.params.id, req.body);
    if (!qd) res.status(404).send('No item found');
    else res.redirect('/quotes/list');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
