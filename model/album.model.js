const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  artist: {
    type: String,
    required: true
  },
  name:  {
    type: String,
    required: true
  },
  tracks:  {
    type: Number,
    required: true
  },
  lengthMin:  {
    type: Number,
    required: true
  }
});

const Album = mongoose.model('album', AlbumSchema);

//seed data
const album = new Album({
  artist: 'XXXTentacion',
  name: '17',
  tracks: 11,
  lengthMin: 22
}); album.save();
console.log(album);

module.exports = Album;
