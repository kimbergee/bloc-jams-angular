(function() {
  function SongPlayer() {
    var SongPlayer = {};

    var currentSong = null;

/*
@desc Buzz object audio file
@type {Object}
*/
    var currentBuzzObject = null;

/*
@function setSong
@desc Stops currently playing song and loads new audio file as currentBuzzObject
@param {Object} song
*/

    var setSong = function(song) {
      if (currentBuzzObject) {
// stop currently playing song
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

// set a new Buzz sound object
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

// Set the newly chosen song object as the currentSong and play it
      currentSong = song;
    }

    SongPlayer.play = function(song) {
// if currently playing song is not the song that the user clicks on:
      if (currentSong !== song) {
        setSong(song);
        currentBuzzObject.play();
// update boolean so that pause button displays
        song.playing = true;
/* if currently playing song is the song that the user clicks on, then it is
probably paused and the user would like to resume playing it */
      } else if (currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
        }
      }
    };

    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
