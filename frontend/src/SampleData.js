import DeviceInfo from "./model/DeviceInfo";

function generateData() {

    var sampleSenders = [
        new DeviceInfo(1, "Sender 1", "1:23:456:789", 0, "123:456", 480, ["Additional Device details go here"]),
        new DeviceInfo(2, "Sender 2", "1:32:456:789", 1, "132:456", 480, ["Additional Device details go here"]),
        new DeviceInfo(3, "Sender 3", "1:42:356:789", 2, "142:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(4, "Sender 4", "1:52:356:789", 3, "152:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(1, "Sender 5", "1:24:456:789", 0, "123:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(2, "Sender 6", "1:33:456:789", 1, "132:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(3, "Sender 7", "1:43:356:789", 2, "142:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(4, "Sender 8", "1:52:356:789", 3, "152:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(1, "Sender 9", "1:25:456:789", 0, "123:456", 480, ["Additional Device Details go here"]),
    ];

    var sampleReceivers = [
        new DeviceInfo(1, "Receiver 1", "1:23:456:789", 0, "123:456", 480, ["Additional Device details go here"]),
        new DeviceInfo(2, "Receiver 2", "1:32:456:789", 1, "132:456", 480, ["Additional Device details go here"]),
        new DeviceInfo(3, "Receiver 3", "1:42:356:789", 2, "142:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(4, "Receiver 4", "1:52:356:789", 3, "152:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(1, "Receiver 5", "1:24:456:789", 0, "123:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(2, "Receiver 6", "1:33:456:789", 1, "132:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(3, "Receiver 7", "1:43:356:789", 2, "142:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(4, "Receiver 8", "1:52:356:789", 3, "152:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(1, "Receiver 9", "1:25:456:789", 0, "123:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(1, "Receiver 10", "1:25:456:789", 0, "123:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(1, "Receiver 11", "1:23:456:789", 0, "123:456", 480, ["Additional Device details go here"]),
        new DeviceInfo(2, "Receiver 12", "1:32:456:789", 1, "132:456", 480, ["Additional Device details go here"]),
        new DeviceInfo(3, "Receiver 13", "1:42:356:789", 2, "142:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(4, "Receiver 14", "1:52:356:789", 3, "152:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(1, "Receiver 15", "1:24:456:789", 0, "123:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(2, "Receiver 16", "1:33:456:789", 1, "132:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(3, "Receiver 17", "1:43:356:789", 2, "142:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(4, "Receiver 18", "1:52:356:789", 3, "152:456", 480, ["Additional Device Details go here"]),
        new DeviceInfo(1, "Receiver 19", "1:25:456:789", 0, "123:456", 480, ["Additional Device Details go here"]),
    ];

    return (
        { senders: sampleSenders, receivers: sampleReceivers }
    );

}

export default generateData;