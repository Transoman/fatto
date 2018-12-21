<div class="contact-map_close"></div>
<div id="map"></div>

<script>
  var jsonPoints = {"type":"FeatureCollection","features":[{"type":"Feature","id":null,"geometry":{"type":"Point","coordinates":[<?php echo $_GET['lng']; ?>,<?php echo $_GET['lat']; ?>]},"properties":[],"options":[]}],"center":[<?php echo $_GET['lng']; ?>, <?php echo $_GET['lat']; ?>]};
  var myMap = null;
  setTimeout(function () {
    ymaps.ready(init);
  }, 10);

  function init () {
    var centerCoord = jsonPoints.features[0].geometry.coordinates;
    myMap = new ymaps.Map('map', {
      center: centerCoord,
      zoom: 16
    }, {
      searchControlProvider: 'yandex#search'
    }),
      objectManager = new ymaps.ObjectManager({
          clusterize: true,
          gridSize: 32
      });

    objectManager.clusters.options.set('preset', 'islands#redClusterIcons');
    objectManager.add(jsonPoints);
    myMap.geoObjects.add(objectManager);
    if(jsonPoints.features.length != 1) myMap.setBounds( objectManager.getBounds() );
  }
</script>