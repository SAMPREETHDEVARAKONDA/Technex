// getting places from APIs
function loadPlaces(position) {
  const params = {
    radius: 300, // search places not farther than this value (in meters)
    clientId: "<your-client-id>",
    clientSecret: "<your-client-secret>",
    version: "20300101" // foursquare versioning, required but unuseful for this demo
  };

  // CORS Proxy to avoid CORS problems
  const corsProxy = "https://cors-anywhere.herokuapp.com/";

  // Foursquare API (limit param: number of maximum places to fetch)
  const endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=30 
        &v=${params.version}`;
  return fetch(endpoint)
    .then(res => {
      return res.json().then(resp => {
        return resp.response.venues;
      });
    })
    .catch(err => {
      console.error("Error with places API", err);
    });
}

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
    placename: "Karma",
    latitude: 25.257711,
    longitude: 82.985525
  },
  {
    placename: "VT",
    latitude: 25.265955,
    longitude: 82.987942
  }
];

window.onload = () => {
  const scene = document.querySelector("a-scene");

  // first get current user location
  return navigator.geolocation.getCurrentPosition(
    function(position) {
      Locations.forEach(place => {
        const latitude = place.latitude;
        const longitude = place.longitude;

        // add place name
        const placeText = document.createElement("a-link");
        placeText.setAttribute(
          "gps-entity-place",
          `latitude: ${latitude}; longitude: ${longitude};`
        );
        placeText.setAttribute("title", place.placename);
        placeText.setAttribute("scale", "15 15 15");

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
