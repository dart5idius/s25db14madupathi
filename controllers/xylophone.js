const xylophone = require('../models/xylophone');

exports.xylophone_list = async (req, res) => {
    try {
      console.log("Executing xylophone_list controller");
      const results = await xylophone.find({});
      console.log(`Found ${results.length} xylophone`);
      res.json(results);
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: err.message });
    }
  };

// [Keep all your other controller methods]

// For a specific xylophone
exports.xylophone_detail = async function(req, res) {
    try {
        const xylophoneItem = await xylophone.findById(req.params.id);
        if (!xylophone) {
            return res.status(404).send('xylophone not found');
        }
        res.send(xylophoneItem);
    } catch (err) {
        res.status(500).send('Error retrieving xylophone: ' + err);
    }
};

// Handle xylophone create on POST
exports.xylophone_create_post = async function(req, res) {
    try {
        const newxylophone = new xylophone({
            material: req.body.material,
            keys: req.body.keys,
            tuning: req.body.tuning
        });
        await newxylophone.save();
        res.status(201).send(newxylophone);
    } catch (err) {
        res.status(400).send('Error creating xylophone: ' + err);
    }
};

// Handle xylophone delete on DELETE
exports.xylophone_delete = async function(req, res) {
    try {
        const deletedxylophone = await xylophone.findByIdAndDelete(req.params.id);
        if (!deletedxylophone) {
            return res.status(404).send('xylophone not found');
        }
        res.send(deletedxylophone);
    } catch (err) {
        res.status(500).send('Error deleting xylophone: ' + err);
    }
};

// Handle xylophone update on PUT
exports.xylophone_update_put = async function(req, res) {
    try {
        const updatedxylophone = await xylophone.findByIdAndUpdate(
            req.params.id,
            {
                material: req.body.material,
                keys: req.body.keys,
                tuning: req.body.tuning
            },
            { new: true }
        );
        if (!updatedxylophone) {
            return res.status(404).send('xylophone not found');
        }
        res.send(updatedxylophone);
    } catch (err) {
        res.status(400).send('Error updating xylophone: ' + err);
    }
};

// View all xylophones page
exports.xylophone_view_all_Page = async function(req, res) {
    try {
        const thexylophone = await xylophone.find();
        res.render('xylophone', { 
            title: 'xylophone Search Results', 
            results: thexylophone
        });
    } catch(err) {
        res.status(500).send('Error: ' + err);
    }
};