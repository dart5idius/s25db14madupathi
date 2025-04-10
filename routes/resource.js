const express = require('express');
const router = express.Router();
const xylophone_controller = require('../controllers/xylophone');

// Debug middleware
router.use((req, res, next) => {
  console.log(`[Resource] ${req.method} ${req.path}`);
  next();
});

// API Routes
router.get('/xylophone', xylophone_controller.xylophone_list);
router.get('/xylophone/:id', xylophone_controller.xylophone_detail);
router.post('/xylophone', xylophone_controller.xylophone_create_post);
router.delete('/xylophone/:id', xylophone_controller.xylophone_delete);
router.put('/xylophone/:id', xylophone_controller.xylophone_update_put);

module.exports = router;