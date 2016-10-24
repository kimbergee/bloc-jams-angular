(function() {
  function Metric($firebaseArray, $rootScope, Fixtures) {
    var ref = firebase.database().ref();
    var songPlays = $firebaseArray(ref);

    return {
      // Function that records a metric object by pushing it to the $rootScope array
      saveSongPlay: function(songObj) {
        // Add time to event saveSongPlay
        var uglyDate = new Date();
        var niceDate = moment(uglyDate).format('MMM DD YY, h:mm a');

        songObj['playedAt'] = niceDate;

        songPlays.$add(songObj);
      },

      listSongsPlayed: function() {
        var songs = songPlays;

        angular.forEach(songPlays, function(song) {
          songs.push({
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
