const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RockAlbumSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.']
  },
  band:  {
    type: String,
    required: [true, 'Artist is required.']
  },
  pictureURL:   {
    type: String
  },
  tracks: {
    type: Number,
    validate: {
      validator: (tracks) => tracks > 0,
      message: 'Tracks must be greater than 0.'
    },
    required: true
  },
  lengthMin: {
    type: Number,
    validate: {
      validator: (lengthMin) => lengthMin > 0,
      message: 'LengthMin must be greater than 0.'
    },
    required: true
  },
  //
  // rockBand: [{
  //     type: Schema.Types.ObjectId,
  //     ref: 'rockBand'
  // }],
  rockLabel: [{
      type: Schema.Types.ObjectId,
      ref: 'rocklabel'
  }],
},

    { usePushEach: true }
);

const RockAlbum = mongoose.model('rockalbum', RockAlbumSchema);

// //seed data
// const album = new Album({
//   artist: 'Rae Sremmurd',
//   name: 'Sremmlife 1',
//   pictureURL: 'https://i1.wp.com/blog.imamusicmogul.com/wp-content/uploads/2017/03/rae-sremmurd-swang-remake-instrumental-flstudio-logic-x-mike-will-made-it-drums-synth-midi-session-beatmaking-video-tutorial.jpg?fit=650%2C650',
//   tracks: 11,
//   lengthMin: 22,
//   rapper:{
//     rapperName: 'Khalif Brown',
//     breakthroughTrack: 'no type',
//     dateOfBirth: '1996'
//   },
//   recordcompany: {
//     labelName: 'Ear Drummers'
//   }
// }); album.save();
// console.log(album);

module.exports = RockAlbum;
