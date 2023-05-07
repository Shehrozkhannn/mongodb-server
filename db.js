const mongoose = require('mongoose');
mongoose.pluralize(null);

const startupSchema = new mongoose.Schema({
	                  hostname: String
});

module.exports = mongoose.model('startup_log', startupSchema);
