import type { LatLngExpression } from 'leaflet';

type Message = {
  id?: string;
  text: string;
  isSent: boolean;
};

type MarkerInfo = {
  position: LatLngExpression;
  popupText: string;
};

export { Message, MarkerInfo };
