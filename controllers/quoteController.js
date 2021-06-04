const express = require('express');
const Quote = require('../models/quotes');

const app = express();

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

function updaterecord(req, res) {
  Quote.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err) => {
    if (!err) {
      res.redirect('/quote/list');
    } else {
      console.log(err);
      res.render('user/add.handlebars', {
        title: 'Error update',
      });
    }
  });
}
app.get('/', (req, res) => {
  res.render('user/quote.handlebars', { title: 'Form input' });
});
app.post('/add', async (req, res) => {
  if (req.body.id === '') {
    addrecord(req, res);
  } else {
    updaterecord(req, res);
  }
});

app.get('/list', (req, res) => {
  Quote.find({}).then((quotes) => {
    res.render('user/list.handlebars',
      { quotes: quotes.map((quote) => quote.toJSON()) });
  });
});

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

// delete
app.get('/delete/:id', async (req, res) => {
  try {
    const qd = await Quote.findByIdAndDelete(req.params.id, req.body);
    if (!qd) res.status(404).send('No item found');
    else res.redirect('/quote/list');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
