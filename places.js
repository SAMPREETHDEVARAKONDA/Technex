const Locations = [
  {
    placename: "LT1",
    latitude: 25.260215,
    longitude: 82.991178
  },
  {
    placename: "LC",
    latitude: 25.260708,
    longitude: 82.986878
  },
  {
    placename: "IITBHU",
    latitude: 25.263308,
    longitude: 82.989659
  },
  {
    placename: "VT",
    latitude: 25.265955,
    longitude: 82.987942
  },{
    placename: "SURAJ SAINI ROOM",
    latitude: 25.258398,
    longitude: 82.985758
  },{
    placename: "SAMPREETHDEVARAKONDA ROOM",
    latitude: 25.257775,
    longitude: 82.985382
  },{
    placename: "Karma Center",
    latitude: 25.258140,
    longitude: 82.985531
  },
];

window.onload = () => {
  const scene = document.querySelector("a-scene");
  return navigator.geolocation.getCurrentPosition(
    function(position) {
      Locations.forEach(place => {
        const latitude = place.latitude;
        const longitude = place.longitude;

        const placeText = document.createElement("a-link");
        placeText.setAttribute(
          "gps-entity-place",
          `latitude: ${latitude}; longitude: ${longitude};`
        );
        placeText.setAttribute("title", place.placename);
        // placeText.setAttribute("scale", "15 15 15");
        placeText.setAttribute('src', '../assets/map-marker.png');

        placeText.addEventListener("loaded", () => {
          window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
        });

        scene.appendChild(placeText);
      });
    },
    err => console.error("Error in retrieving position", err),
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 27000
    }
  );
};
