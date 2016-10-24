(function() {
  function AlbumCtrl(Fixtures, SongPlayer, Metric) {
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer;
    this.metric = Metric;
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', 'Metric', AlbumCtrl]);
})();
