import axios from 'axios';
import StreamInfo from '../model/StreamInfo';
import * as SampleData from './SampleData';

export function getAllStreams(callback) {
    axios.get("http://localhost:8080/stream")
        .then((streams) => {
            Promise.all(streams.data.map(
                (streamId) => {
                    return getStream(streamId);
                }
            )).then(callback)
        })
        .catch((error) => {
            console.log(error);
            SampleData.getAllStreams(callback);
        });
}

export function getStream(streamId) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:8080/stream/${streamId}`)
            .then((response) => {
                var stream = response.data;
                resolve(new StreamInfo(
                    stream.id,
                    stream.outputChannel.encoder,
                    stream.inputChannel.decoder,
                    ["Additional stream info goes here."]))
            })
            .catch(reject);
    })
}