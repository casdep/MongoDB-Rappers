const assert = require('assert');
var Album  = require('../model/album.model');
describe('Reading albums out of the database', () => {
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

   it('finds all albums with a name of Sremmlife', (done) => {
    Album.find({name: 'Sremmlife 1'})
        .then((albums) => {
        assert(albums[0]._id.toString() === Sremmlife._id.toString());
        done();
        });
   }) ;

   it('find a album with particular id', (done) => {
       Album.findOne({ _id: Sremmlife._id} )
           .then((album) => {
           assert(album.name === 'Sremmlife 1');
           done();
           });
   });
});
