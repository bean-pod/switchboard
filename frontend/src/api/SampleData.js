import DeviceInfo from "../model/DeviceInfo";
import OutChannelInfo from "../model/OutputChannelInfo";
import InChannelInfo from "../model/InputChannelInfo";
import StreamInfo from "../model/StreamInfo";

export function getSenders(callback) {
    
    var sampleOutputChannels = [
        new OutChannelInfo(1,"Output ch 1", 500, null),
        new OutChannelInfo(2,"Output ch 2", 456, null),
        new OutChannelInfo(3,"Output ch 3", 800, null)
    ]
    var extras = ["Additional Device details go here"];
    var sampleSenders = [
        new DeviceInfo("1:10:111:999", null, "123:456", "Sender 1", "Online", sampleOutputChannels, extras),
        new DeviceInfo("1:20:111:999", null, "123:456", "Sender 2", "Error", sampleOutputChannels, extras),
        new DeviceInfo("1:30:111:999", null, "123:456", "Sender 3", "Offline", sampleOutputChannels, extras),
        new DeviceInfo("1:40:111:999", null, "123:456", "Sender 4", "Pending", sampleOutputChannels, extras),
        new DeviceInfo("1:50:111:999", null, "123:456", "Sender 5", "Online", sampleOutputChannels, extras),
        new DeviceInfo("1:60:111:999", null, "123:456", "Sender 6", "Error", sampleOutputChannels, extras),
        new DeviceInfo("1:70:111:999", null, "123:456", "Sender 7", "Offline", sampleOutputChannels, extras),
        new DeviceInfo("1:80:111:999", null, "123:456", "Sender 8", "Pending", sampleOutputChannels, extras),
        new DeviceInfo("1:90:111:999", null, "123:456", "Sender 9", "Online", sampleOutputChannels, extras)
    ];

    callback(sampleSenders)
}

export function getReceivers(callback) {
    var extras = ["Additional Device details go here"];
    var sampleInputChannels = [
        new InChannelInfo(1,"Input ch 1", 500, null),
        new InChannelInfo(2,"Input ch 2", 456, null),
        new InChannelInfo(3,"Input ch 3", 800, null)
    ]
    var sampleReceivers = [
        
        new DeviceInfo("1:01:111:999", null, "123:456", "Receiver 1", "Online", sampleInputChannels, extras),
        new DeviceInfo("1:02:111:999", null, "123:456", "Receiver 2", "Error",  sampleInputChannels, extras),
        new DeviceInfo("1:03:111:999", null, "123:456", "Receiver 3", "Offline", sampleInputChannels, extras),
        new DeviceInfo("1:04:111:999", null, "123:456", "Receiver 4", "Pending", sampleInputChannels, extras),
        new DeviceInfo("1:05:111:999", null, "123:456", "Receiver 5", "Online", sampleInputChannels, extras),
        new DeviceInfo("1:06:111:999", null, "123:456", "Receiver 6", "Error", sampleInputChannels, extras),
        new DeviceInfo("1:07:111:999", null, "123:456", "Receiver 7", "Offline", sampleInputChannels, extras),
        new DeviceInfo("1:08:111:999", null, "123:456", "Receiver 8", "Pending", sampleInputChannels, extras),
        new DeviceInfo("1:09:111:999", null, "123:456", "Receiver 9", "Online", sampleInputChannels, extras),
        new DeviceInfo("1:11:111:999", null, "123:456", "Receiver 11", "Online", sampleInputChannels, extras),
        new DeviceInfo("1:21:111:999", null, "123:456", "Receiver 12", "Error", sampleInputChannels, extras),
        new DeviceInfo("1:31:111:999", null, "123:456", "Receiver 13", "Offline", sampleInputChannels, extras),
        new DeviceInfo("1:41:111:999", null, "123:456", "Receiver 14", "Pending", sampleInputChannels, extras),
        new DeviceInfo("1:51:111:999", null, "123:456", "Receiver 15", "Online", sampleInputChannels, extras),
        new DeviceInfo("1:61:111:999", null, "123:456", "Receiver 16", "Error", sampleInputChannels, extras),
        new DeviceInfo("1:71:111:999", null, "123:456", "Receiver 17", "Offline", sampleInputChannels, extras),
        new DeviceInfo("1:81:111:999", null, "123:456", "Receiver 18", "Pending", sampleInputChannels, extras),
        new DeviceInfo("1:91:111:999", null, "123:456", "Receiver 19", "Online", sampleInputChannels, extras)
     ];

    callback(sampleReceivers)
}

export function getStreams(callback) {
    var sampleSenders = [
        new DeviceInfo(1, "Sender 1", "1:23:456:789", "Online", "123:456", 480, ["Additional Device details go here"]),
        new DeviceInfo(2, "Sender 2", "1:32:456:789", "Pending", "132:456", 480, ["Additional Device details go here"])
    ];
    var sampleReceivers = [
        new DeviceInfo(1, "Receiver 1", "1:23:456:789", "Online", "123:456", 480, ["Additional Device details go here"]),
        new DeviceInfo(2, "Receiver 2", "1:32:456:789", "Pending", "132:456", 480, ["Additional Device details go here"]),
    ];

    var sampleStreams = [
        new StreamInfo(1, "2020-10-31T08:15:30", sampleSenders[0], sampleReceivers[0], "Online", "Type 1", "00:34:44", ["Additional Stream Details go here"]),
        new StreamInfo(2, "2020-11-01T09:16:30", sampleSenders[1], sampleReceivers[1], "Error", "Type 2", "01:34:44", ["Additional Stream Details go here"]),
        new StreamInfo(3, "2020-10-20T14:17:30", sampleSenders[0], sampleReceivers[0], "Offline", "Type 3", "02:34:44", ["Additional Stream Details go here"])
    ];

    callback(sampleStreams)
}