// reference 18.1.5
const mongoose = require('mongoose');
//-------------------------------------
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// reference 18.1.5
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network');

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
