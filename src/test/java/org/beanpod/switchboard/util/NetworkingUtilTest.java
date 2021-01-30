package org.beanpod.switchboard.util;

import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class NetworkingUtilTest {
  private NetworkingUtil networkingUtil;

  @BeforeEach
  public void setup() {
    networkingUtil = new NetworkingUtil();
  }

  @Test
  public void testAreDevicesOnSamePrivateNetwork_DevicesHaveSameIP() {
    DeviceDto firstDevice = DeviceFixture.getDeviceDto();
    DeviceDto secondDevice = DeviceFixture.getDeviceDto();

    boolean result = networkingUtil.areDevicesOnSamePrivateNetwork(firstDevice, secondDevice);

    assertTrue(result);
  }

  @Test
  public void testAreDevicesOnSamePrivateNetwork_DevicesHaveDifferentIP() {
    DeviceDto firstDevice = DeviceFixture.getDeviceDto();
    DeviceDto secondDevice = DeviceFixture.getDeviceDto();
    String otherPublicIp = "167.242.86.43";
    firstDevice.setPublicIpAddress(otherPublicIp);

    boolean result = networkingUtil.areDevicesOnSamePrivateNetwork(firstDevice, secondDevice);

    assertFalse(result);
  }

  @Test
  public void testDeviceOnSameLocalNetworkAsService_DeviceHasDifferentPublicAndPrivateId() {
    DeviceDto device = DeviceFixture.getDeviceDto();

    boolean result = networkingUtil.isDeviceOnSameLocalNetworkAsService(device);

    assertFalse(result);
  }

  @Test
  public void testDeviceOnSameLocalNetworkAsService_DeviceHasSamePublicAndPrivateId() {
    DeviceDto device = DeviceFixture.getDeviceDto();
    device.setPublicIpAddress(device.getPrivateIpAddress());

    boolean result = networkingUtil.isDeviceOnSameLocalNetworkAsService(device);

    assertTrue(result);
  }

  @Test
  public void testDeviceOnSameLocalNetworkAsService_DeviceHasLoopbackIpV4PublicIpAddress() {
    DeviceDto device = DeviceFixture.getDeviceDto();
    device.setPublicIpAddress(NetworkingUtil.LOOPBACK_IP_V4);

    boolean result = networkingUtil.isDeviceOnSameLocalNetworkAsService(device);

    assertTrue(result);
  }

  @Test
  public void testDeviceOnSameLocalNetworkAsService_DeviceHasLoopbackIpV6PublicIpAddress() {
    DeviceDto device = DeviceFixture.getDeviceDto();
    device.setPublicIpAddress(NetworkingUtil.LOOPBACK_IP_V6);

    boolean result = networkingUtil.isDeviceOnSameLocalNetworkAsService(device);

    assertTrue(result);
  }

  @Test
  public void testAreDevicesOnSameLocalNetworkAsService_NoDevicesAreOnLocalNetwork() {
    DeviceDto firstDevice = DeviceFixture.getDeviceDto();
    DeviceDto secondDevice = DeviceFixture.getDeviceDto();

    boolean result =
        networkingUtil.areDevicesOnSameLocalNetworkAsService(firstDevice, secondDevice);

    assertFalse(result);
  }

  @Test
  public void testAreDevicesOnSameLocalNetworkAsService_FirstDeviceIsOnLocalNetwork() {
    DeviceDto firstDevice = DeviceFixture.getDeviceDto();
    firstDevice.setPublicIpAddress(firstDevice.getPrivateIpAddress());
    DeviceDto secondDevice = DeviceFixture.getDeviceDto();

    boolean result =
        networkingUtil.areDevicesOnSameLocalNetworkAsService(firstDevice, secondDevice);

    assertFalse(result);
  }

  @Test
  public void testAreDevicesOnSameLocalNetworkAsService_SecondDeviceIsOnLocalNetwork() {
    DeviceDto firstDevice = DeviceFixture.getDeviceDto();
    DeviceDto secondDevice = DeviceFixture.getDeviceDto();
    secondDevice.setPublicIpAddress(secondDevice.getPrivateIpAddress());

    boolean result =
        networkingUtil.areDevicesOnSameLocalNetworkAsService(firstDevice, secondDevice);

    assertFalse(result);
  }

  @Test
  public void testAreDevicesOnSameLocalNetworkAsService_BothDevicesAreOnLocalNetwork() {
    DeviceDto firstDevice = DeviceFixture.getDeviceDto();
    firstDevice.setPublicIpAddress(firstDevice.getPrivateIpAddress());
    DeviceDto secondDevice = DeviceFixture.getDeviceDto();
    secondDevice.setPublicIpAddress(secondDevice.getPrivateIpAddress());

    boolean result =
        networkingUtil.areDevicesOnSameLocalNetworkAsService(firstDevice, secondDevice);

    assertTrue(result);
  }
}
