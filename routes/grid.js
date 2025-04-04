// routes/grid.js
var express = require('express');
var router = express.Router();

// GET request for the grid route
router.get('/', function(req, res, next) {
  // Log the query parameters
  let query = req.query;  // Get query params from the URL
  console.log(`Grid route was hit!`);
  console.log(`rows: ${query.rows}`);
  console.log(`cols: ${query.cols}`);
  
  // Render the 'grid' page with the query data
  res.render('grid', { title: 'Grid Display', query: query });
});

module.exports = router;
