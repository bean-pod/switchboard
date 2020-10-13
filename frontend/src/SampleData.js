
class DeviceInfo{
    constructor(id, name, mac, status, ip, port, extras) {

        this.id =  id;
        this.name = name;
        this.mac = mac;
        this.status =  status;
        this.ip = ip;
        this.port = port;
        this.extras = extras;
    }
}

function generateData()
{
   return (
    [
        [
           new DeviceInfo(1, "Sender 1", "1:23:456:789", 0, "123:456", 480, ["one", "onee"]), // t
           new DeviceInfo(2, "Sender 2", "1:32:456:789", 1, "132:456", 480, ["two", "twoo"]), // t
           new DeviceInfo(3, "Sender 3", "1:42:356:789", 2, "142:456", 480, ["three", "threee"]), 
           new DeviceInfo(4, "Sender 4", "1:52:356:789", 3, "152:456", 480, ["four", "fourr"]), //
           new DeviceInfo(1, "Sender 5", "1:23:456:789", 0, "123:456", 480, ["one", "onee"]), // t
           new DeviceInfo(2, "Sender 6", "1:32:456:789", 1, "132:456", 480, ["two", "twoo"]), // t
           new DeviceInfo(3, "Sender 7", "1:42:356:789", 2, "142:456", 480, ["three", "threee"]), 
           new DeviceInfo(4, "Sender 8", "1:52:356:789", 3, "152:456", 480, ["four", "fourr"]), //
           new DeviceInfo(1, "Sender 9", "1:23:456:789", 0, "123:456", 480, ["one", "onee"]), // t
           new DeviceInfo(2, "Sender 10", "1:32:456:789", 1, "132:456", 480, ["two", "twoo"]), // t
        ],
        [
          new  DeviceInfo(1, "receiver 1", "1:23:456:789", 0, "123:456", 480, ["one", "onee"]), // t
          new  DeviceInfo(2, "receiver 2", "1:32:456:789", 1, "132:456", 480, ["two", "twoo"]), // t
          new  DeviceInfo(3, "receiver 3", "1:42:356:789", 2, "142:456", 480, ["three", "threee"]), 
          new  DeviceInfo(4, "receiver 4", "1:52:356:789", 3, "152:456", 480, ["four", "fourr"]), //
          new  DeviceInfo(1, "receiver 1", "1:23:456:789", 0, "123:456", 480, ["one", "onee"]), // t
          new  DeviceInfo(2, "receiver 2", "1:32:456:789", 1, "132:456", 480, ["two", "twoo"]), // t
          new  DeviceInfo(3, "receiver 3", "1:42:356:789", 2, "142:456", 480, ["three", "threee"]), 
          new  DeviceInfo(4, "receiver 4", "1:52:356:789", 3, "152:456", 480, ["four", "fourr"]), //
          new  DeviceInfo(1, "receiver 1", "1:23:456:789", 0, "123:456", 480, ["one", "onee"]), // t
          new  DeviceInfo(2, "receiver 2", "1:32:456:789", 1, "132:456", 480, ["two", "twoo"]), // t
          new  DeviceInfo(3, "receiver 3", "1:42:356:789", 2, "142:456", 480, ["three", "threee"]), 
          new  DeviceInfo(4, "receiver 4", "1:52:356:789", 3, "152:456", 480, ["four", "fourr"]), //
          new  DeviceInfo(1, "receiver 1", "1:23:456:789", 0, "123:456", 480, ["one", "onee"]), // t
          new  DeviceInfo(2, "receiver 2", "1:32:456:789", 1, "132:456", 480, ["two", "twoo"]), // t
          new  DeviceInfo(3, "receiver 3", "1:42:356:789", 2, "142:456", 480, ["three", "threee"]), 
          new  DeviceInfo(4, "receiver 4", "1:52:356:789", 3, "152:456", 480, ["four", "fourr"]), //
          new  DeviceInfo(1, "receiver 1", "1:23:456:789", 0, "123:456", 480, ["one", "onee"]), // t
          new  DeviceInfo(2, "receiver 2", "1:32:456:789", 1, "132:456", 480, ["two", "twoo"]), // t
          new  DeviceInfo(3, "receiver 3", "1:42:356:789", 2, "142:456", 480, ["three", "threee"]), 
          new  DeviceInfo(4, "receiver 4", "1:52:356:789", 3, "152:456", 480, ["four", "fourr"]) // 
        ]
   ]
   );
  
}

export default generateData;