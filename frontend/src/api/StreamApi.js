import axios from 'axios';
import StreamInfo from '../model/StreamInfo';
import * as SampleData from './SampleData';

export function getStreams(callback) {
    axios.get("http://localhost:8080/stream")
        .then((streams) => {
            callback(
                streams.data.map((stream) => {
                    return new StreamInfo(
                        stream.id,
                        stream.outputChannel.encoder.displayName,
                        stream.inputChannel.decoder.displayName,
                        ["Additional stream info goes here."]);
                }));
        })
        .catch((error) => {
            SampleData.getStreams(callback);
        });
}