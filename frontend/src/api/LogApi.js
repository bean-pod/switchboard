import axios from "axios";
import LogInfo from "../model/LogInfo";
import * as SampleData from "./SampleData";

export function getLog(logId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_LOG}/${logId}`)
      .then((response) => {
        const log = response.data;
        resolve(
          new LogInfo(
            log.id,
            log.dateTime,
            log.level,
            log.message
          )
        );
      })
      .catch(reject);
  });
}

export function getAllLogs(callback) {
  axios
    .get(process.env.REACT_APP_LOG)
    .then((logs) => {
      Promise.all(
        logs.data.map((logId) => {
          return getLog(logId);
        })
      ).then(callback);
    })
    .catch(() => {
      SampleData.getAllLogs(callback);
    });
}