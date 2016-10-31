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


      getSongPlayCounts: function() {
        var counts = _.countBy(songPlays, "title");
        var countObj = _.map(counts, function(count, title) {
          return {
            key: title,
            y: count
          };
        });
        return countObj;
      },

      getSongPlays: function() {
        return songPlays;
      }
    };

  }

  angular
    .module('blocJams')
    .service('Metric', ['$firebaseArray', '$rootScope', 'Fixtures', Metric]);
})();
