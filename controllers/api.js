// API description for our resources
exports.api = function(req, res) {
    res.write('[');
    res.write('{"resource": "xylophones", ');
    res.write(' "verbs": ["GET", "POST", "PUT", "DELETE"], ');
    res.write(' "description": "Manage xylophone inventory", ');
    res.write(' "fields": {"material": "String", "keys": "Number", "tuning": "String"}');
    res.write('}');
    res.write(']');
    res.send();
};