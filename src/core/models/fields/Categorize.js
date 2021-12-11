const mongoose = require('mongoose');

module.exports = {
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	},
}