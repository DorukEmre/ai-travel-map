import type { LatLngExpression } from 'leaflet';

type Message = {
  id?: string;
  text: string;
  isSent: boolean;
};

interface MessageListProps {
  messages: ReadonlyArray<Message>;
}


type MarkerInfo = {
  position: LatLngExpression;
  popupText: string;
};

export { Message, MessageListProps, MarkerInfo };
