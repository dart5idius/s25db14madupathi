const Xylophone = require('../models/xylophone');

// GET all xylophones
exports.xylophone_list = async (req, res) => {
    try {
        console.log("Fetching all xylophones...");
        const results = await Xylophone.find({});
        console.log(`Found ${results.length} xylophones.`);
        res.json(results);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ 
            error: "Database operation failed",
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// GET one xylophone by ID 
exports.xylophone_detail = async function(req, res) {
    console.log("Fetching detail for xylophone ID:", req.params.id);
    try {
        const xylophoneItem = await Xylophone.findById(req.params.id);
        if (!xylophoneItem) {
            console.warn(`Xylophone not found: ${req.params.id}`);
            return res.status(404).json({
                error: `Xylophone with ID ${req.params.id} not found`
            });
        }
        res.status(200).json(xylophoneItem);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({
            error: `Internal server error while looking for ID ${req.params.id}`
        });
    }
};

// POST new xylophone
exports.xylophone_create_post = async function(req, res) {
    try {
        const newXylophone = new Xylophone({
            material: req.body.material,
            keys: req.body.keys,
            tuning: req.body.tuning
        });
        await newXylophone.save();
        res.status(201).send(newXylophone);
    } catch (err) {
        console.error("Error creating xylophone:", err);
        res.status(400).send('Error creating xylophone: ' + err);
    }
};

// PUT update existing xylophone
exports.xylophone_update_put = async function(req, res) {
    console.log(`Update request for xylophone ID ${req.params.id} with data:`, req.body);
    try {
        const xylophoneToUpdate = await Xylophone.findById(req.params.id);
        if (!xylophoneToUpdate) {
            return res.status(404).send(`Xylophone with id ${req.params.id} not found.`);
        }

        // Update only if the field exists in the request body
        if (req.body.material !== undefined) xylophoneToUpdate.material = req.body.material;
        if (req.body.keys !== undefined) xylophoneToUpdate.keys = req.body.keys;
        if (req.body.tuning !== undefined) xylophoneToUpdate.tuning = req.body.tuning;

        const result = await xylophoneToUpdate.save();
        console.log("Update successful:", result);
        res.send(result);
    } catch (err) {
        console.error("Error updating xylophone:", err);
        res.status(500).send(`{"error": "${err}": Update for id ${req.params.id} failed"}`);
    }
};

// DELETE xylophone
exports.xylophone_delete = async function(req, res) {
    try {
        const deletedXylophone = await Xylophone.findByIdAndDelete(req.params.id);
        if (!deletedXylophone) {
            return res.status(404).send(`Xylophone with id ${req.params.id} not found.`);
        }
        console.log("Deleted xylophone:", deletedXylophone);
        res.send(deletedXylophone);
    } catch (err) {
        console.error("Error deleting xylophone:", err);
        res.status(500).send('Error deleting xylophone: ' + err);
    }
};

// Render view for one specific xylophone using query parameter
exports.xylophone_view_one_Page = async function(req, res) {
    console.log("View single xylophone for ID:", req.query.id);
    try {
        const result = await Xylophone.findById(req.query.id).lean();
        if (!result) {
            console.log("❌ No document found.");
            return res.status(404).send("Document not found");
        }
        console.log("✅ Document found:", result);
        res.render('xylophonedetail', {
            title: 'Xylophone Detail',
            toShow: result
        });
    } catch (err) {
        console.error("🔥 Error in controller:", err);
        res.status(500).send(`{'error': '${err}'}`);
    }
};


// Render the form page to create a new xylophone
exports.xylophone_create_Page = function(req, res) {
    console.log("Create view loaded");
    try {
      res.render('xylophonecreate', { title: 'Create New Xylophone' });
    } catch (err) {
      res.status(500).send(`{'error': '${err}'}`);
    }
  };


  exports.xylophone_update_Page = async function(req, res) {
    console.log("🔄 Trying to update xylophone with ID:", req.query.id);
    try {
        const result = await Xylophone.findById(req.query.id).lean();
        if (!result) {
            console.warn(`No xylophone found to update with ID: ${req.query.id}`);
            return res.status(404).render('error', {
                message: "Xylophone not found",
                error: { status: 404 }
            });
        }
        res.render('xylophoneupdate', {
            title: 'Update Xylophone',
            toShow: result
        });
    } catch (err) {
        console.error("🔥 Error loading update page:", err);
        res.status(500).render('error', {
            message: "Internal Server Error",
            error: err
        });
    }
};

// Render the view for deleting a xylophone
exports.xylophone_delete_Page = async function(req, res) {
    console.log("Delete view for ID:", req.query.id);
    try {
        const result = await Xylophone.findById(req.query.id).lean();
        if (!result) {
            return res.status(404).send("Document not found");
        }
        res.render('xylophonedelete', {
            title: 'Delete Xylophone',
            toShow: result
        });
    } catch (err) {
        res.status(500).send(`{'error': '${err}'}`);
    }
};


  
// Render all xylophones on a view page
exports.xylophone_view_all_Page = async function(req, res) {
    try {
        const theXylophones = await Xylophone.find({}).lean();

        res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });

        res.render('xylophone', { 
            title: 'Xylophone Search Results', 
            results: theXylophones,
            lastUpdated: Date.now()
        });
    } catch(err) {
        console.error('Error rendering xylophone view:', err);
        res.status(500).render('error');
    }
};
