const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RockBandSchema = new Schema({
  bandName: {
    type: String,
    required: [true, 'The band name is required']
  }
  artists: [{
    type: String,
    required: [true, 'Name(s) of bands aritst(s) is/are required']
  }],
  bestTrack: {
  type: String,
  required: [true, 'The best track of the Band is required']
},

},
    { usePushEach: true }
);

const RockBand = mongoose.model('rockband', RockBandSchema);

module.exports = RockBand;
