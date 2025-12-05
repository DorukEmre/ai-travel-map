import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import type { MarkerInfo } from '@/types/types';
import { useEffect, useState } from 'react';
import type { LatLngExpression } from 'leaflet';


const TravelMap = ({ cities }: { cities: MarkerInfo[] }) => {
  const [mapHeight, setMapHeight] = useState<number>(64);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>();

  // let markers: MarkerInfo[] = [
  //   { position: [40.417, -3.704], popupText: "Madrid, Spain" },
  //   { position: [41.3851, 2.1734], popupText: "Barcelona, Spain" },
  //   { position: [48.8566, 2.3522], popupText: "Paris, France" },
  // ];

  const updateMapHeight = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) { // Small screens
      setMapHeight(64);
    } else { // Large screens
      setMapHeight(96);
    }
  };

  // Adjust map height on component mount and on window resize
  useEffect(() => {
    updateMapHeight();

    window.addEventListener('resize', updateMapHeight);

    return () => {
      window.removeEventListener('resize', updateMapHeight);
    };
  }, []);

  useEffect(() => {
    console.log("cities length: ", cities.length)
    console.log("cities: ", cities)
    if (cities.length >= 1) {
      console.log(cities[0].position)
      setMapCenter(cities[0].position);
    }

  }, [cities]);

  return (
    <>
      {mapHeight && mapCenter &&
        <div className={`w-full h-${mapHeight} my-4 rounded-lg overflow-hidden`}>

          <MapContainer center={mapCenter} zoom={1} scrollWheelZoom={true} style={{ height: "100%", minHeight: "100%" }}>

            <TileLayer
              attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {cities.map((marker, index) => (
              <Marker key={index} position={marker.position}>
                <Popup>
                  <strong>{marker.city}</strong>: {marker.popupText}
                </Popup>
              </Marker>
            ))}

          </MapContainer>

        </div>
      }
    </>
  );
};

export default TravelMap;
