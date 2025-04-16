/*var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('Xylophones', { title: 'Search results' });
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');
const xylophoneController = require('../controllers/Xylophone');

// API description endpoint
router.get('/api', apiController.api);

/* GET main xylophones view - ONLY CHANGE REQUIRED 
router.get('/', xylophoneController.xylophone_view_all_Page);

// View rendering route (your existing functionality)
router.get('/', async (req, res) => {
  try {
    const xylophones = await xylophoneController.xylophone_list(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// REST API routes
router.post('/api/xylophones', xylophoneController.xylophone_create_post);
router.get('/api/xylophones', xylophoneController.xylophone_list);
router.get('/api/xylophones/:id', xylophoneController.xylophone_detail);
router.put('/api/xylophones/:id', xylophoneController.xylophone_update_put);
router.delete('/api/xylophones/:id', xylophoneController.xylophone_delete);

module.exports = router; */
const express = require('express');
const router = express.Router();
const xylophone_Controller = require('../controllers/xylophone');

// Debug: Verify imported methods
console.log('Available controller methods:', Object.keys(xylophone_Controller));

// Debug middleware
router.use((req, res, next) => {
  console.log('[View] Accessing xylophone view');
  next();
});

/* GET main xylophone view */
router.get('/', xylophone_Controller.xylophone_view_all_Page);
/* GET detail xylophone page */
router.get('/detail', xylophone_Controller.xylophone_view_one_Page);



module.exports = router;











