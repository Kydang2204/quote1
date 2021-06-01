const express = require('express');

const Quote = require('../models/quotes');

const app = express();

// add quote
app.post('/quote', async (req, res) => {
  const q = new Quote(req.body);
  try {
    await q.save();
    res.send(q);
  } catch {
    const funct = (error) => {
      res.status(500).send(error);
    };
    funct();
  }
});
// get all
app.get('/list', async (req, res) => {
  const qs = await Quote.find({});
  try {
    res.send(qs);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch('/list/:id', async (req, res) => {
  try {
    const qu = await Quote.findByIdAndUpdate(req.params.id, req.body);
    await qu.save();
    res.send(qu);
  } catch {
    const funct1 = (error) => {
      res.status(500).send(error);
    };
    funct1();
  }
});

app.delete('/list/:id', async (req, res) => {
  try {
    const qd = await Quote.findByIdAndDelete(req.params.id, req.body);
    if (!qd) res.status(404).send('No item found');
    else res.status(200).send('Delete finish');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
