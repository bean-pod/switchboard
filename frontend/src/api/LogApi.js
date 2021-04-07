import axios from "axios";
import LogInfo from "../model/LogInfo";
import StreamLogInfo from "../model/StreamLogInfo";
import { getAuthorizationHeader } from "./AuthenticationUtil";

async function getLogs(endpoint) {
  return axios.get(endpoint, getAuthorizationHeader()).then((response) => {
    return Promise.resolve(
      response.data.map((log) => {
        return new LogInfo(log.id, log.dateTime, log.level, log.message);
      })
    );
  });
}

export async function getAllLogs() {
  return getLogs(process.env.REACT_APP_LOG);
}

export async function getDeviceLogs(deviceSerialNumber) {
  return getLogs(`${process.env.REACT_APP_LOG}/${deviceSerialNumber}`);
}

export async function getStreamLogs(streamId) {
  return axios
    .get(
      `${process.env.REACT_APP_STREAMLOG}/${streamId}`,
      getAuthorizationHeader()
    )
    .then((response) => {
      return Promise.resolve(
        response.data.map((log) => {
          return new StreamLogInfo(
            log.logEntity.dateTime,
            log.logEntity.level,
            log.logEntity.message
          );
        })
      );
    });
}
