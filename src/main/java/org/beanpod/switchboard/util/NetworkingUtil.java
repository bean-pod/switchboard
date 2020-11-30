package org.beanpod.switchboard.util;

import org.beanpod.switchboard.dto.DeviceDto;
import org.springframework.stereotype.Component;

@Component
public class NetworkingUtil {
  public static final String LOOPBACK_IP_V4 = "127.0.0.1";
  public static final String LOOPBACK_IP_V6 = "0:0:0:0:0:0:0:1";

  public boolean areDevicesOnSamePrivateNetwork(DeviceDto firstDevice, DeviceDto secondDevice) {
    String firstIpAddress = firstDevice.getPublicIpAddress();
    String secondIpAddress = secondDevice.getPublicIpAddress();
    return firstIpAddress.equals(secondIpAddress);
  }

  public boolean isDeviceOnSameLocalNetworkAsService(DeviceDto deviceDto) {
    // If the public IP address of a device is equal to its private IP address, then the device must
    // be on the same local network as the service. Additionally, if the public IP address of a
    // device is the Loopback IP address, then the device is running on the same computer as the
    // service and therefore is on the same local network.
    return deviceDto.getPublicIpAddress().equals(deviceDto.getPrivateIpAddress())
        || deviceDto.getPublicIpAddress().equals(LOOPBACK_IP_V4)
        || deviceDto.getPublicIpAddress().equals(LOOPBACK_IP_V6);
  }

  // Tests if the two devices are on the same local network as the service.
  public boolean areDevicesOnSameLocalNetworkAsService(
      DeviceDto firstDevice, DeviceDto secondDevice) {
    return isDeviceOnSameLocalNetworkAsService(firstDevice)
        && isDeviceOnSameLocalNetworkAsService(secondDevice);
  }
}
