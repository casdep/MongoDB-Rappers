const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RapperSchema = new Schema({
    name: String,
    pictureURL: String,
    breakthroughTrack: String,
    dateOfBirth: String
});

const Rapper = mongoose.model('rapper', RapperSchema);

const rapper = new Rapper({
  name: 'XXXTentacion',
  pictureURL: 'https://is3-ssl.mzstatic.com/image/thumb/Music122/v4/e7/16/1b/e7161b6e-272d-ce01-f026-28a0bfb80b8d/888915347232_cover.jpg/600x600bf.jpg',
  dateOfBirth:'23-01-1998',
  breakthroughTrack: 'Look At Me'
}); rapper.save();
console.log(rapper);

module.exports = Rapper;
