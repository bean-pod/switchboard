import axios from "axios";
import LogInfo from "../model/LogInfo";
import * as SampleData from "./SampleData";

export async function getAllLogs() {
  return axios
    .get(process.env.REACT_APP_LOGS)
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

export async function getDeviceLogs(deviceSerialNumber) {
  return axios
    .get(`${process.env.REACT_APP_LOGS}/${deviceSerialNumber}`)
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
