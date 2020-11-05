import DeviceInfo from "../model/DeviceInfo";
import ChannelInfo from "../model/ChannelInfo";

export function getSenders(callback) {
    var sampleSenders = [
        new DeviceInfo(1, "Sender 1", "1:23:456:789", "Online", "123:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device details go here"]),
        new DeviceInfo(2, "Sender 2", "1:32:456:789", "Pending", "132:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device details go here"]),
        new DeviceInfo(3, "Sender 3", "1:42:356:789", "Error", "142:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(4, "Sender 4", "1:52:356:789", "Offline", "152:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(5, "Sender 5", "1:24:456:789", "Online", "123:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(6, "Sender 6", "1:33:456:789", "Pending", "132:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(7, "Sender 7", "1:43:356:789", "Error", "142:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(8, "Sender 8", "1:52:356:789", "Offline", "152:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(9, "Sender 9", "1:25:456:789", "Online", "123:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
    ];

    callback(sampleSenders)
}

export function getReceivers(callback) {
    var sampleReceivers = [
        new DeviceInfo(1, "Receiver 1", "1:23:456:789", "Online", "123:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device details go here"]),
        new DeviceInfo(2, "Receiver 2", "1:32:456:789", "Pending", "132:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device details go here"]),
        new DeviceInfo(3, "Receiver 3", "1:42:356:789", "Error", "142:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(4, "Receiver 4", "1:52:356:789", "Offline", "152:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(5, "Receiver 5", "1:24:456:789", "Online", "123:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(6, "Receiver 6", "1:33:456:789", "Pending", "132:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(7, "Receiver 7", "1:43:356:789", "Error", "142:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(8, "Receiver 8", "1:52:356:789", "Offline", "152:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(9, "Receiver 9", "1:25:456:789", "Online", "123:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(10, "Receiver 10", "1:25:456:789", "Online", "123:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(11, "Receiver 11", "1:23:456:789", "Online", "123:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device details go here"]),
        new DeviceInfo(12, "Receiver 12", "1:32:456:789", "Pending", "132:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device details go here"]),
        new DeviceInfo(13, "Receiver 13", "1:42:356:789", "Error", "142:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(14, "Receiver 14", "1:52:356:789", "Offline", "152:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(15, "Receiver 15", "1:24:456:789", "Online", "123:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(16, "Receiver 16", "1:33:456:789", "Pending", "132:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(17, "Receiver 17", "1:43:356:789", "Error", "142:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(18, "Receiver 18", "1:52:356:789", "Offline", "152:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
        new DeviceInfo(19, "Receiver 19", "1:25:456:789", "Online", "123:456", 480, [new ChannelInfo("channel 1", 420), new ChannelInfo("channel 2", 69)], ["Additional Device Details go here"]),
    ];

    callback(sampleReceivers)
}