package org.beanpod.switchboard.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.mapper.DeviceMapper;
import org.beanpod.switchboard.dto.mapper.UserMapper;
import org.beanpod.switchboard.entity.DecoderEncoderInterface;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MaintainDeviceStatus {

  public static final String OFFLINE_STATUS = "offline";
  private static final DateUtil date = new DateUtil();
  private static final String ONLINE_STATUS = "online";
  private final DeviceDaoImpl deviceDao;
  private final DeviceMapper deviceMapper;
  private final UserMapper userMapper;

  /*
   * maintain and create logs when decoders or encoders are retrieved
   * T should be of type DecoderEntity or EncoderEntity
   */
  public <T extends DecoderEncoderInterface> List<DeviceEntity> maintainStatusField(
      List<T> devices) {
    Date dateToBeCompared = getDateToBeCompared();
    List<DeviceEntity> updatedDevices = new ArrayList<>();

    for (T encoderOrDecoder : devices) {
      if (encoderOrDecoder.getLastCommunication() == null) {
        continue;
      }
      // if device is online but has not communicated in 10 minutes
      if (encoderOrDecoder.getDevice().getStatus().equalsIgnoreCase(ONLINE_STATUS)
          && dateToBeCompared.after(encoderOrDecoder.getLastCommunication())) {
        // update status to offline
        (encoderOrDecoder.getDevice()).setStatus(OFFLINE_STATUS);
        deviceDao.save(
            encoderOrDecoder.getDevice().getUser(),
            deviceMapper.toDto(encoderOrDecoder.getDevice()));

        updatedDevices.add(encoderOrDecoder.getDevice());
      } else if (((encoderOrDecoder).getDevice().getStatus()).equalsIgnoreCase(OFFLINE_STATUS)
          && dateToBeCompared.before(encoderOrDecoder.getLastCommunication())) {
        // update status to online
        (encoderOrDecoder.getDevice()).setStatus(ONLINE_STATUS);
        deviceDao.save(
            encoderOrDecoder.getDevice().getUser(),
            deviceMapper.toDto(encoderOrDecoder.getDevice()));

        updatedDevices.add(encoderOrDecoder.getDevice());
      } else {
        updatedDevices.add(encoderOrDecoder.getDevice());
      }
    }

    return updatedDevices;
  }

  // maintain and create logs when streams are retrieved
  public List<DeviceEntity> maintainStatusField(StreamDto streamDto) {
    DecoderDto decoder = streamDto.getInputChannel().getDecoder();
    EncoderDto encoder = streamDto.getOutputChannel().getEncoder();
    List<DeviceEntity> updatedDevices = new ArrayList<>();

    updateDeviceStatusField(decoder.getDevice(), updatedDevices);
    updateDeviceStatusField(encoder.getDevice(), updatedDevices);

    return updatedDevices;
  }

  private void updateDeviceStatusField(DeviceDto device, List<DeviceEntity> updatedDevices) {
    if ((device.getStatus()).equalsIgnoreCase(OFFLINE_STATUS)) {
      device.setStatus(ONLINE_STATUS);
      deviceDao.save(userMapper.toEntity(device.getUser()), device);

      updatedDevices.add(deviceMapper.toEntity(device));
    }
  }

  private Date getDateToBeCompared() {
    // subtract 10minutes from the current date
    Date dateToBeCompared = date.getCurrentDate();
    dateToBeCompared.setTime(System.currentTimeMillis() - 600000);

    return dateToBeCompared;
  }
}
