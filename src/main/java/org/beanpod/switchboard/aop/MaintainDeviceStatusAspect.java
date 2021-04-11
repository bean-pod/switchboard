package org.beanpod.switchboard.aop;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.tuple.Pair;
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
    createStreamLog(updatedDevices);
  }

  @AfterReturning(
      value =
          "execution(* org.beanpod.switchboard.util.MaintainDeviceStatus"
              + ".maintainStatusField(java.util.List))",
      returning = "updatedDevices")
  public void createLogEncoderAndDecoder(List<Pair<DeviceEntity, Boolean>> updatedDevices) {
    createLog(updatedDevices);
  }

  private void createStreamLog(List<DeviceEntity> updatedDevices) {
    if (!updatedDevices.isEmpty()) {
      for (DeviceEntity device : updatedDevices) {
        String message =
            "Device " + device.getSerialNumber() + " has changed status to " + device.getStatus();
        logService.createLog(message, "info", device.getSerialNumber());
      }
    }
  }

  // helper method to create logs
  private void createLog(List<Pair<DeviceEntity, Boolean>> updatedDevices) {
    if (!updatedDevices.isEmpty()) {
      for (Pair<DeviceEntity, Boolean> device : updatedDevices) {
        if (Boolean.TRUE.equals(device.getRight())) {
          String message =
              "Device "
                  + device.getLeft().getSerialNumber()
                  + " has changed status to "
                  + device.getLeft().getStatus();
          logService.createLog(message, "info", device.getLeft().getSerialNumber());
        }
      }
    }
  }
}
