// const assert = require('assert');
// var Album  = require('../model/album.model');
//
// describe('Deleting a album', () => {
//     let Sremmlife;
//    beforeEach((done) => {
//        Sremmlife = new Album({
//          artist: 'Rae Sremmurd',
//          name: 'Sremmlife 1',
//          pictureURL: 'https://i1.wp.com/blog.imamusicmogul.com/wp-content/uploads/2017/03/rae-sremmurd-swang-remake-instrumental-flstudio-logic-x-mike-will-made-it-drums-synth-midi-session-beatmaking-video-tutorial.jpg?fit=650%2C650',
//          tracks: 11,
//          lengthMin: 22,
//          rapper:{
//            rapperName: 'Khalif Brown',
//            breakthroughTrack: 'no type',
//            dateOfBirth: '1996'
//          },
//          recordcompany: {
//            labelName: 'Ear Drummers'
//          }
//        });
//        Sremmlife.save()
//            .then(() => done());
//    });
//
//
//    it('model instance remove', (done) => {
//         Sremmlife.remove()
//             .then(() => Album.findOne({name: 'Sremmlife 1'}))
//             .then((album) => {
//             assert(album === null);
//             done();
//             })
//    });
//
//     it('class method remove', (done) => {
//         // Remove a bunch of records with a given criteria
//         Album.remove({ name: 'Sremmlife 1' })
//             .then(() => Album.findOne({name: 'Sremmlife 1'}))
//             .then((album) => {
//                 assert(album === null);
//                 done();
//         });
//     });
//
//     it('class method findOneAndRemove', (done) => {
//         Album.findOneAndRemove({name: 'Sremmlife 1'}).then(() => Album.findOne({name: 'Sremmlife 1'}))
//             .then((album) => {
//                 assert(album === null);
//                 done();
//             });
//     });
//
//     it('class method findByIdAndRemove', (done) => {
//         Album.findByIdAndRemove(Sremmlife._id)
//             .then(() => Album.findOne({name: 'Sremmlife 1'}))
//             .then((album) => {
//                 assert(album === null);
//                 done();
//             });
//     });
// });
