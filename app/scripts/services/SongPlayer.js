(function() {
  function SongPlayer() {
    var SongPlayer = {};

/*
@desc currentSong object
@type {Object}
*/
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
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

// Set the newly chosen song object as the currentSong
      currentSong = song;
    }

/*
@function playSong
@desc Starts playing currentBuzzObject and sets song playing boolean to true
@param {Object} song
*/
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    }

/*
@function SongPlayer.play
@desc Checks if currently playing song is not the song that the user clicks on
and calls setSong function if true
@param {Object} song
*/
    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);

/* if currently playing song is the song that the user clicks on, then it is
probably paused and the user would like to resume playing it */
      } else if (currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
        }
      }
    };

/*
@function SongPlayer.pause
@desc Pauses the currently playing song and sets the playing boolean to false
@param {Object} song
*/
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
