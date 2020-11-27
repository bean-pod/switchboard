import DeviceInfo from "../../model/DeviceInfo"
import OutputChannelInfo from "../../model/OutputChannelInfo"

export function getSampleSendersResponse() {
    return [
        {
            "serialNumber": "d7TxFn7o",
            "lastCommunication": "2020-11-25 20:48:03",
            "device": {
                "serialNumber": "d7TxFn7o",
                "ipAddress": "127.0.0.1",
                "displayName": "sample_sender",
                "status": "Running"
            },
            "output": [
                {
                    "id": 3,
                    "channel": {
                        "id": 2,
                        "name": "Channel Two",
                        "port": 2000
                    }
                }
            ]
        }
    ]
}

export function getExpectedSendersResponse() {
    const sampleSendersResponse = getSampleSendersResponse();
    return [
        new DeviceInfo(
            sampleSendersResponse[0].serialNumber,
            sampleSendersResponse[0].lastCommunication,
            sampleSendersResponse[0].device.ipAddress,
            sampleSendersResponse[0].device.displayName,
            "Online",
            [new OutputChannelInfo(
                sampleSendersResponse[0].output[0].id,
                sampleSendersResponse[0].output[0].channel.name,
                sampleSendersResponse[0].output[0].channel.port,
                null
            )],
            ["Additional Device details go here"]
            )
    ]
}

export function getSampleReceiversResponse() {
    return [
        {
            "serialNumber": "z7VBn9aK",
            "lastCommunication": null,
            "device": {
                "serialNumber": "z7VBn9aK",
                "ipAddress": "127.0.0.1",
                "displayName": "sample_receiver",
                "status": "Running"
            },
            "input": [
                {
                    "id": 4,
                    "channel": {
                        "id": 1,
                        "name": "Channel One",
                        "port": 2000
                    }
                }
            ]
        }
    ]
}

export function getExpectedReceiversResponse() {
    const sampleReceiversResponse = getSampleReceiversResponse();
    return [
        new DeviceInfo(
            sampleReceiversResponse[0].serialNumber,
            sampleReceiversResponse[0].lastCommunication,
            sampleReceiversResponse[0].device.ipAddress,
            sampleReceiversResponse[0].device.displayName,
            "Pending",
            [new OutputChannelInfo(
                sampleReceiversResponse[0].output[0].id,
                sampleReceiversResponse[0].output[0].channel.name,
                sampleReceiversResponse[0].output[0].channel.port,
                null
            )],
            ["Additional Device details go here"]
            )
    ]
}