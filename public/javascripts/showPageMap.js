maptilersdk.config.apiKey = mapToken;

const map = (window.map = new maptilersdk.Map({
        container: 'map', // container's id or the HTML element to render the map
        style: maptilersdk.MapStyle.STREETS,  // stylesheet location
        zoom: 3,
        center: campground.geometry.coordinates,
      }));

    //   const gc = new maptilersdkMaptilerGeocoder.GeocodingControl({});

    //   map.addControl(gc, 'top-left');
    new maptilersdk.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new maptilersdk.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)
  