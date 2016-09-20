(function() {
  function SongPlayer($rootScope, Fixtures) {
    var SongPlayer = {};

/*
@desc Store current album info
@type {Object}
*/
    var currentAlbum = Fixtures.getAlbum();

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
        stopSong(SongPlayer.currentSong);
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

// Set the newly chosen song object as the SongPlayer.currentSong
      SongPlayer.currentSong = song;
    }

/*
@function getSongIndex
@desc Gets the index of a song
@param {Object} song
*/
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

/*
@desc SongPlayer.currentSong object
@type {Object}
*/
    SongPlayer.currentSong = null;

/*
@desc Current playback time (in seconds) of currently playing song
@type {Number}
*/
    SongPlayer.currentTime = null;

/*
@desc Current volume level
@type {Number}
*/
    SongPlayer.currentVolume = null;

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
@function stopSong
@desc Stops playing currentBuzzObject and sets song playing boolean to false
@param {Object} song
*/

    var stopSong = function(song) {
      currentBuzzObject.stop();
      song.playing = null;
    }

/*
@function SongPlayer.play
@desc Checks if currently playing song is not the song that the user clicks on
and calls setSong function if true
@param {Object} song
*/
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);

/* if currently playing song is the song that the user clicks on, then it is
probably paused and the user would like to resume playing it */
      } else if (SongPlayer.currentSong === song) {
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
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

/*
@function SongPlayer.previous
@desc Goes to the previous song by getting the index of the current song and
decreasing by 1
*/
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong(SongPlayer.currentSong);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

/*
@function SongPlayer.next
@desc Goes to the next song by getting the index of the current song and
increasing by 1
*/
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex >= currentAlbum.songs.length) {
        stopSong(SongPlayer.currentSong);
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      };
    };

/*
@function setCurrentTime
@desc Set current time (in seconds) of currently playing song
@param {Number} time
*/

    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };

/*
@function setVolume
@desc Set volume of currently playing song
@param {Number} volume
*/
    SongPlayer.setVolume = function(volume) {
      currentBuzzObject.setVolume(volume);
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
