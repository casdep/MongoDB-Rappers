const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RapperSchema = new Schema({
  name:  {
    type: String,
    required: true
  },
  pictureURL:   {
    type: String,
    required: true
  },
  breakthroughTrack:   {
    type: String,
    required: true
  },
  dateOfBirth:   {
    type: String,
    required: false
  }
});

const Rapper = mongoose.model('rapper', RapperSchema);

//seed data
const rapper = new Rapper({
    name: 'Rae Sremmurd',
    pictureURL: 'https://i.scdn.co/image/f210fc5536fd12775209cf38dcd3720c5f93722d',
    breakthroughTrack: 'No Type',
    dateOfBirth: '1995',
}); rapper.save();
console.log(rapper);

module.exports = Rapper;
