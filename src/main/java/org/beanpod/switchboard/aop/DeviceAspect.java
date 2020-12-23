package org.beanpod.switchboard.aop;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.beanpod.switchboard.service.LogService;
import org.openapitools.model.CreateDeviceRequest;
import org.openapitools.model.DeviceModel;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Configuration
@Component
@RequiredArgsConstructor
public class DeviceAspect {

  private final LogService logService;

  @AfterReturning(
      "execution(* org.beanpod.switchboard.controller.DeviceController.createDevice(..))")
  public void createDevice(JoinPoint joinPoint) {
    Object[] args = joinPoint.getArgs();
    CreateDeviceRequest createDeviceRequest = (CreateDeviceRequest) args[0];
    String status = createDeviceRequest.getStatus();
    String serialNumber = createDeviceRequest.getSerialNumber();
    String message = String.format("Device with serial number %s has been created", serialNumber);
    if (status.equals("online") || status.equals("offline")) {
      message = message.concat(" with status " + status);
    }
    logService.createLog(message, "info");
  }

  @AfterReturning(
      "execution(* org.beanpod.switchboard.controller.DeviceController.updateDevice(..))")
  public void updateDevice(JoinPoint joinPoint) {
    String message;
    Object[] args = joinPoint.getArgs();
    DeviceModel deviceModel = (DeviceModel) args[0];
    String status = deviceModel.getStatus();
    if (status.equals("online") || status.equals("offline")) {
      message = "A device has been updated with a status of " + status;
      logService.createLog(message, "info");
    }
  }
}
