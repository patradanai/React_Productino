import mqtt from "mqtt";
import * as actiontypes from "../store/Actions/actionTypes";
import { ws_onMessage, ws_connected, ws_disconnected } from "../store/Actions";

const SocketMiddleware = store => {
  let mqttSocket = null;
  return next => action => {
    switch (action.type) {
      case actiontypes.MQTT_CONNECT:
        if (mqttSocket !== null) {
          mqttSocket.end();
          store.dispatch(ws_disconnected());
        }

        // Connect to MQTT BROKER VIA WEBSOCKET
        mqttSocket = mqtt.connect("mqtt://66c91ba0.ngrok.io");

        store.dispatch(ws_connected());

        if (store.getState().MQTT.connected) {
          mqttSocket.on("connect", () => {
            console.log("Connected MQTT");
            mqttSocket.subscribe("/REALTIME/NEWLINE/PARSER/STATUS/#");
          });

          mqttSocket.on("message", (topic, message) => {
            store.dispatch(ws_onMessage(JSON.parse(message.toString())));
          });
        }
        break;
      case actiontypes.MQTT_DISCONNECT:
        if (mqttSocket !== null) {
          mqttSocket.end();
          store.dispatch(ws_disconnected());
        }
        mqttSocket = null;
        break;
      case "MQTT_MESSAGE":
        break;
      default:
        break;
    }
    return next(action);
  };
};

export default SocketMiddleware;
