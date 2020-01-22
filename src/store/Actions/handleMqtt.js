import * as actiontypes from "../Actions/actionTypes";

export const ws_connect = () => {
  return {
    type: actiontypes.MQTT_CONNECT
  };
};

export const ws_connected = () => {
  return {
    type: actiontypes.MQTT_CONNECTED
  };
};

export const ws_disconnect = () => {
  return {
    type: actiontypes.MQTT_DISCONNECT
  };
};

export const ws_disconnected = () => {
  return {
    type: actiontypes.MQTT_DISCONNECTED
  };
};

export const ws_onMessage = data => {
  return {
    type: actiontypes.MQTT_ONMESSAGE,
    msgPacket: data
  };
};

export const ws_onStatus = () => {
  return {
    type: actiontypes.MQTT_ONSTATUS
  };
};

export const ws_onProduction = () => {
  return {
    type: actiontypes.MQTT_ONPRODUCTION
  };
};

export const ws_onMessageProduction = data => {
  return {
    type: actiontypes.MQTT_ONMESSAGEPRODUCTION,
    msgPacket: data
  };
};
