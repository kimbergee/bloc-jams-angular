(function() {
  function Metric($firebaseArray, $rootScope, Fixtures) {
    var ref = firebase.database().ref();
    var songPlays = $firebaseArray(ref);

    return {

      // Function that records a metric object by pushing it to the $rootScope array
      saveSongPlay: function(songObj, songMetrics) {

        // Add time to event saveSongPlay
        var uglyDate = new Date();
        var niceDate = moment(uglyDate).format('MMM DD YY, h:mm a');
        var currentAlbum = Fixtures.getAlbum(songObj);
        var currentArtist = currentAlbum.artist;
        var songTitle = songObj.title;

        songMetrics = {};

        songMetrics['title'] = songTitle;
        songMetrics['artist'] = currentArtist;
        songMetrics['playedAt'] = niceDate;

        // Add to firebaseArray
        songPlays.$add(songMetrics);

      },

      listSongsPlayed: function() {
        var songs = [];

        angular.forEach(songPlays, function(song) {
          songs.push({
            artist: song.artist,
            title: song.title,
            playedAt: song.playedAt,
          });
        });

        return songs;
      }
    };
  }

  angular
    .module('blocJams')
    .service('Metric', ['$firebaseArray', '$rootScope', 'Fixtures', Metric]);
})();
