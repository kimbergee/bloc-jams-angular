(function() {
  function Metric($rootScope) {
    $rootScope.songPlays = [];

    return {
      // Function that records a metric object by pushing it to the $rootScope array
      registerSongPlay: function(songObj) {
        // Add time to event registerSongPlay
        var uglyDate = new Date();
        var niceDate = moment(uglyDate).format('MMM DD YY, h:mm a');

        songObj['playedAt'] = niceDate;

        $rootScope.songPlays.push(songObj);
      },

      listSongsPlayed: function() {
        var songs = [];
        angular.forEach($rootScope.songPlays, function(song) {
          songs.push(song.title, song.playedAt);
        });
        
        return songs;
      }
    };
  }

  angular
    .module('blocJams')
    .service('Metric', ['$rootScope', Metric]);
})();
