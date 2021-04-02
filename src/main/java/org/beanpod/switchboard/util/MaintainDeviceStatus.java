package org.beanpod.switchboard.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.mapper.DeviceMapper;
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

  /*
   * maintain and create logs when decoders or encoders are retrieved
   * T should be of type DecoderEntity or EncoderEntity
   */
  public <T extends DecoderEncoderInterface> List<DeviceEntity> maintainStatusField(
      List<T> devices) {
    Date dateToBeCompared = getDateToBeCompared();
    List<DeviceEntity> updatedDevices = new ArrayList<>();

    for (int i = 0; i < devices.size(); i++) {
      T encoderOrDecoder = devices.get(i);
      if (encoderOrDecoder.getLastCommunication() == null) {
        continue;
      }
      // if device is online but has not communicated in 10 minutes
      if (encoderOrDecoder.getDevice().getStatus().equalsIgnoreCase(ONLINE_STATUS)
          && dateToBeCompared.after(encoderOrDecoder.getLastCommunication())) {
        // update status to offline
        (encoderOrDecoder.getDevice()).setStatus(OFFLINE_STATUS);
        deviceDao.save(deviceMapper.toDeviceDto(encoderOrDecoder.getDevice()));

        updatedDevices.add(encoderOrDecoder.getDevice());
      } else if (((encoderOrDecoder).getDevice().getStatus()).equalsIgnoreCase(OFFLINE_STATUS)
          && dateToBeCompared.before(encoderOrDecoder.getLastCommunication())) {
        // update status to online
        (encoderOrDecoder.getDevice()).setStatus(ONLINE_STATUS);
        deviceDao.save(deviceMapper.toDeviceDto(encoderOrDecoder.getDevice()));

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

    // update the status field for decoder
    if ((decoder.getDevice().getStatus()).equalsIgnoreCase(OFFLINE_STATUS)) {
      decoder.getDevice().setStatus(ONLINE_STATUS);
      deviceDao.save(decoder.getDevice());

      updatedDevices.add(deviceMapper.toDeviceEntity(decoder.getDevice()));
    }

    // update the status field for encoder
    if ((encoder.getDevice().getStatus()).equalsIgnoreCase(OFFLINE_STATUS)) {
      encoder.getDevice().setStatus(ONLINE_STATUS);
      deviceDao.save(encoder.getDevice());

      updatedDevices.add(deviceMapper.toDeviceEntity(decoder.getDevice()));
    }

    return updatedDevices;
  }

  private Date getDateToBeCompared() {
    // subtract 10minutes from the current date
    Date dateToBeCompared = date.getCurrentDate();
    TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    dateToBeCompared.setTime(System.currentTimeMillis() - 600000);

    return dateToBeCompared;
  }
}
