const assert = require('assert');
var Album  = require('../model/album.model');

describe('Updating records', () => {
   let Sremmlife;

   beforeEach((done) => {
       Sremmlife = new Album({
         artist: 'Rae Sremmurd',
         name: 'Sremmlife 1',
         pictureURL: 'https://i1.wp.com/blog.imamusicmogul.com/wp-content/uploads/2017/03/rae-sremmurd-swang-remake-instrumental-flstudio-logic-x-mike-will-made-it-drums-synth-midi-session-beatmaking-video-tutorial.jpg?fit=650%2C650',
         tracks: 11,
         lengthMin: 22,
         rapper:{
           rapperName: 'Khalif Brown',
           breakthroughTrack: 'no type',
           dateOfBirth: '1996'
         },
         recordcompany: {
           labelName: 'Ear Drummers'
         }
       });
       Sremmlife.save()
           .then(() => done());
   });

   function assertName(operation, done) {
       operation
           .then(() => Album.find({}))
           .then((albums) => {
               assert(albums.length === 1);
               assert(albums[0].name === 'Sremmlife 2');
               done();
           });
   }

   it('instance type using set n save', (done) => {
       Sremmlife.set('name', 'Sremmlife 2');
       assertName(Sremmlife.save(), done);
   });

   it('A model instance can update', (done) => {
       assertName(Sremmlife.update({name: 'Sremmlife 2'}), done);
   });

    it('A model class can update', (done) => {
        assertName(Album.update({name: 'Sremmlife 1'}, {name: 'Sremmlife 2'}), done)
    });

    it('A model class can update on record', (done) => {
        assertName(Album.findOneAndUpdate({name: 'Sremmlife 1'}, {name: 'Sremmlife 2'}), done);
    });

    it('A model class can find a record  with an Id and update', (done) => {
        assertName(Album.findByIdAndUpdate(Sremmlife._id, {name: 'Sremmlife 2'}), done)
    });

});
