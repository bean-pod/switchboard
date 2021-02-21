import axios from "axios";
import LogInfo from "../model/LogInfo";
import * as SampleData from "./SampleData";

async function getLogs(endpoint) {
  return axios
    .get(endpoint)
    .then((response) => {
      return Promise.resolve(
        response.data.map((log) => {
          return new LogInfo(log.id, log.dateTime, log.level, log.message);
        })
      );
    })
    .catch(() => {
      return new Promise((resolve) => {
        SampleData.getAllLogs(resolve);
      });
    });
}

export async function getAllLogs() {
  return getLogs(process.env.REACT_APP_LOGS);
}

export async function getDeviceLogs(deviceSerialNumber) {
  return getLogs(`${process.env.REACT_APP_LOGS}/${deviceSerialNumber}`);
}
