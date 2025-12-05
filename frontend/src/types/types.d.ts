import type { LatLngExpression } from 'leaflet';

type Message = {
  id?: string;
  text: string;
  isSent: boolean;
};

type MarkerInfo = {
  city?: string,
  position: LatLngExpression;
  popupText: string;
};

export { Message, MarkerInfo };
