require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const router=require('./routes/quoteroute')
const hdbs = require('express-handlebars');
const quotecontroller = require('./controllers/quoteController');

const url = `mongodb+srv://andy:${process.env.MK}@cluster0.ixw6l.mongodb.net/abc?retryWrites=true&w=majority`;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }));





mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
app.engine('.handlebars', hdbs());
app.set('view engine', '.handlebars');
// app.use(router);
app.use('/quote', quotecontroller);
console.log('Connected to Database');
app.listen(process.env.PORT, () => console.log(`Server is using port ${process.env.PORT}`));
