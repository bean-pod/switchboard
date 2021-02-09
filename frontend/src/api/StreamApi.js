import axios from "axios";
import { convertToDataObject } from "../model/ConvertDataFormat";
import StreamInfo from "../model/StreamInfo";
import * as SampleData from "./SampleData";

export function getAllStreams(callback) {
  axios
    .get(process.env.REACT_APP_STREAM)
    .then((streams) => {
      Promise.all(
        streams.data.map((streamId) => {
          return getStream(streamId);
        })
      ).then(callback);
    })
    .catch((error) => {
      SampleData.getAllStreams(callback);
    });
}

export function getStream(streamId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_STREAM}/${streamId}`)
      .then((response) => {
        const stream = response.data;
        resolve(
          new StreamInfo(
            stream.id,
            convertToDataObject(stream.outputChannel.encoder),
            convertToDataObject(stream.inputChannel.decoder),
            ["Additional stream info goes here."]
          )
        );
      })
      .catch(reject);
  });
}

export function deleteStream(streamId) {
  return axios
    .delete(`${process.env.REACT_APP_STREAM}/${streamId}`)
    .catch(() => {});
}
