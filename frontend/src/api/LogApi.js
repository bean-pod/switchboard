import axios from "axios";
import LogInfo from "../model/LogInfo";
import * as SampleData from "./SampleData";

function getLogs(response) {
  return Promise.resolve(
    response.data.map((log) => {
      return new LogInfo(log.id, log.dateTime, log.level, log.message);
    })
  );
}

function getSampleLogs() {
  return new Promise((resolve) => {
    SampleData.getAllLogs(resolve);
  });
}

export async function getAllLogs() {
  return axios
    .get(process.env.REACT_APP_LOGS)
    .then((response) => {
      getLogs(response);
    })
    .catch(() => {
      getSampleLogs();
    });
}

export async function getDeviceLogs(deviceSerialNumber) {
  return axios
    .get(`${process.env.REACT_APP_LOGS}/${deviceSerialNumber}`)
    .then((response) => {
      getLogs(response);
    })
    .catch(() => {
      getSampleLogs();
    });
}
