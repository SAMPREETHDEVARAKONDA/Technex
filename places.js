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

        const placeText = document.createElement("a-image");
        placeText.setAttribute(
          "gps-entity-place",
          `latitude: ${latitude}; longitude: ${longitude};`
        );
        placeText.setAttribute("name", place.placename);
        placeText.setAttribute("scale", "10 10 10");
        placeText.setAttribute('src', './assets/map-marker.png');

        placeText.addEventListener("loaded", () => {
          window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
        });

        const clickListener = function(ev) {
          ev.stopPropagation();
          ev.preventDefault();

          const name = ev.target.getAttribute('name');
          alert(name)
          const el = ev.detail.intersection && ev.detail.intersection.object.el;

          if (el && el === ev.target) {
              const label = document.createElement('span');
              const container = document.createElement('div');
              container.setAttribute('id', 'place-label');
              label.innerText = name;
              container.appendChild(label);
              document.body.appendChild(container);

              setTimeout(() => {
                  container.parentElement.removeChild(container);
              }, 1500);
          }
      };

      placeText.addEventListener('click', clickListener);

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
