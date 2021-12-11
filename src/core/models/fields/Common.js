const mongoose = require('mongoose');

module.exports = {
  metadata: {
    type: Object,
    default: null,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  deletedAt: {
    type: Date,
    default: ''
  }
}