import axios from "axios";
import { convertToDataObject } from "../model/ConvertDataFormat";
import StreamInfo from "../model/StreamInfo";

export async function getStream(streamId) {
  return axios
      .get(`${process.env.REACT_APP_STREAM}/${streamId}`)
      .then((response) => {
        const stream = response.data;
        return new StreamInfo(
            stream.id,
            convertToDataObject(stream.outputChannel.encoder),
            convertToDataObject(stream.inputChannel.decoder),
            ["Additional stream info goes here."]
          );
      });
}

export async function getAllStreams() {
  return axios
    .get(process.env.REACT_APP_STREAM)
    .then((streams) => {
      return Promise.all(
        streams.data.map((streamId) => {
          return getStream(streamId);
        })
      );
    })
}

export async function deleteStream(streamId) {
  return axios
    .delete(`${process.env.REACT_APP_STREAM}/${streamId}`);
}
