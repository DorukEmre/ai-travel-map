import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import type { MarkerInfo } from '@/types/types';
import { useEffect, useState } from 'react';
import type { LatLngExpression } from 'leaflet';

import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


const TravelMap = ({ cities }: { cities: MarkerInfo[] }) => {
  const [mapCenter, setMapCenter] = useState<LatLngExpression>();

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
      {mapCenter &&
        <div className="w-full h-64 md:h-96 my-4 rounded-lg overflow-hidden">

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
