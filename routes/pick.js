// routes/pick.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('randomitem', { title: 'A random item' });
});

module.exports = router;  // Must export the router