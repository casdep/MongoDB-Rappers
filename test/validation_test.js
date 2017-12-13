const assert = require('assert');
var Album  = require('../model/album.model');

describe('Validating records', () => {
    it('requires a album name', () => {
        const album = new Album({
          artist: 'Rae Sremmurd',
          name: undefined,
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
        const validationResult = album.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name is required.');
    });


    it('disallows invalid records from being saved', (done) => {
        const album = new Album({
          artist: 'Rae Sremmurd',
          name: 'Sremmlife 1',
          pictureURL: 'https://i1.wp.com/blog.imamusicmogul.com/wp-content/uploads/2017/03/rae-sremmurd-swang-remake-instrumental-flstudio-logic-x-mike-will-made-it-drums-synth-midi-session-beatmaking-video-tutorial.jpg?fit=650%2C650',
          tracks: 11,
          lengthMin: -1,
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
            .catch((validationResult) => {
            const {message} = validationResult.errors.lengthMin;

            assert(message === 'LengthMin must be greater than 0.');
            done();
        });
    });
});
