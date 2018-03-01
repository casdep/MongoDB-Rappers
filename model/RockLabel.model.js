const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RockLabelSchema = new Schema({
  labelName: {
    type: String,
    required: [true, 'recordcompany is required.']
  },

  labelAbbrevation: {
    type: String
  }
},
    { usePushEach: true }
);

const RockLabel = mongoose.model('rocklabel', RockLabelSchema);

module.exports = RockLabel;
