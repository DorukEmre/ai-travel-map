import type { LatLngExpression } from 'leaflet';

type Message = {
  id?: string;
  text: string;
  byUser: boolean;
};

type MarkerInfo = {
  city?: string,
  position: LatLngExpression;
  popupText: string;
};

export { Message, MarkerInfo };
