const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordcompanySchema = new Schema({
  name:  {
    type: String,
    required: true
  }
});

const Recordcompany = mongoose.model('recordcompany', RecordcompanySchema);

//seed data
const recordcompany = new Recordcompany({
    name: 'sremmlife',
}); recordcompany.save();
console.log(recordcompany);

module.exports = Recordcompany;
