package org.beanpod.switchboard.aop;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.service.LogService;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
@Aspect
@Component
@RequiredArgsConstructor
public class MaintainDeviceStatusAspect {
  private final LogService logService;

  @AfterReturning(
      value =
          "execution(* org.beanpod.switchboard.util.MaintainDeviceStatus"
              + ".maintainStatusField(org.beanpod.switchboard.dto.StreamDto))",
      returning = "updatedDevices")
  public void createLogStream(List<DeviceEntity> updatedDevices) {
    createLog(updatedDevices);
  }

  @AfterReturning(
      value =
          "execution(* org.beanpod.switchboard.util.MaintainDeviceStatus"
              + ".maintainStatusField(java.util.List))",
      returning = "updatedDevices")
  public void createLogEncoderAndDecoder(List<DeviceEntity> updatedDevices) {
    createLog(updatedDevices);
  }

  // helper method to create logs
  private void createLog(List<DeviceEntity> updatedDevices) {
    if (!updatedDevices.isEmpty()) {
      for (DeviceEntity device : updatedDevices) {
        String message = "Device " + device.getSerialNumber() + " has changed status to " + device.getStatus();
        logService.createLog(message, "info", device.getSerialNumber());
      }
    }
  }
}
