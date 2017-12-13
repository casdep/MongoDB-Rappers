const assert = require('assert');
var Album  = require('../model/album.model');

describe('Creating records', () => {
    it('saves an album', (done) => {
      const album = new Album({
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

        album.save()
            .then(() => {
                assert(!album.isNew);
                done();
            });
        });
});
