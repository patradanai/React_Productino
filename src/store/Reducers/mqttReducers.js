import * as actiontypes from "../Actions/actionTypes";

const initialState = {
  connected: false,
  msgPacket: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  msgProduction: [{}, {}, {}, {}, {}, {}, {}, {}, {}]
};

const SplitPacket = (state, payload) => {
  const InitArray = { ...state.msgPacket };
  const updatePacket = { ...payload };
  const MachineName = [
    "NMPSC-401",
    "NMPSC-402",
    "NMPSC-403",
    "NMPSC-404",
    "NMPSC-405",
    "NMPSC-406",
    "NMPSC-407",
    "NMPSC-408",
    "NMPSC-409"
  ];

  MachineName.forEach((data, index) => {
    if (data === updatePacket.Machine) {
      InitArray[index] = { ...payload };
    }
  });
  return { ...state, msgPacket: InitArray };
};

const SplitProduction = (state, payload) => {
  const InitArray = { ...state.msgProduction };
  const updatePacket = { ...payload };
  const MachineName = [
    "NMPSC-401",
    "NMPSC-402",
    "NMPSC-403",
    "NMPSC-404",
    "NMPSC-405",
    "NMPSC-406",
    "NMPSC-407",
    "NMPSC-408",
    "NMPSC-409"
  ];

  MachineName.forEach((data, index) => {
    if (data === updatePacket.Machine) {
      InitArray[index] = { ...payload };
    }
  });
  return { ...state, msgProduction: InitArray };
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case actiontypes.MQTT_CONNECTED:
      return {
        ...state,
        connected: true
      };
    case actiontypes.MQTT_DISCONNECTED:
      return {
        ...state,
        connected: false
      };
    case actiontypes.MQTT_ONMESSAGE:
      return SplitPacket({ ...state }, action.msgPacket);
    case actiontypes.MQTT_ONMESSAGEPRODUCTION:
      return SplitProduction({ ...state }, action.msgPacket);
    default:
      return state;
  }
};
