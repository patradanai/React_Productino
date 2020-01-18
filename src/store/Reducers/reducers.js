import { combineReducers } from "redux";
import mqttReducer from "./mqttReducers";

export default combineReducers({ MQTT: mqttReducer });
