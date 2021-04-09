package org.beanpod.switchboard.fixture;

import java.text.SimpleDateFormat;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import lombok.SneakyThrows;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.openapitools.model.EncoderModel;

public class EncoderFixture {

  public static final String SERIAL_NUMBER = "1";
  public static final String SERIAL_NUMBER2 = "2";
  private static final String pattern = "yyyy-MM-dd HH:mm:ss";
  private static final SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
  private static final Set<OutputChannelEntity> setOfChannels =
      ChannelFixture.getOutputChannelEntities();
  private static final Set<OutputChannelDto> setOfDtoChannels =
      ChannelFixture.getOutputChannelDtos();

  @SneakyThrows
  public static EncoderEntity getEncoderEntity1() {
    return EncoderEntity.builder()
        .serialNumber(SERIAL_NUMBER)
        .lastCommunication(simpleDateFormat.parse("2020-10-31 05:05:05"))
        .device(DeviceFixture.getDevice1())
        .output(setOfChannels)
        .build();
  }

  @SneakyThrows
  public static EncoderEntity getEncoderEntity2() {
    return EncoderEntity.builder()
        .serialNumber(SERIAL_NUMBER2)
        .lastCommunication(simpleDateFormat.parse("2020-10-31 05:05:05"))
        .device(DeviceFixture.getDevice2())
        .output(setOfChannels)
        .build();
  }

  public static List<EncoderEntity> getListOfEncoder() {
    List<EncoderEntity> listOfEncoders = new ArrayList<>();
    listOfEncoders.add(getEncoderEntity1());
    listOfEncoders.add(getEncoderEntity2());
    return listOfEncoders;
  }

  public static List<EncoderDto> getEncoderDtos() {
    return List.of(getEncoderDto());
  }

  @SneakyThrows
  public static EncoderDto getEncoderDto() {
    return EncoderDto.builder()
        .serialNumber(SERIAL_NUMBER)
        .lastCommunication(simpleDateFormat.parse("2020-10-31 05:05:05"))
        .device(DeviceFixture.getDeviceDto())
        .output(setOfDtoChannels)
        .build();
  }

  public static EncoderModel getEncoderModel() {
    return new EncoderModel()
        .serialNumber(SERIAL_NUMBER)
        .lastCommunication(OffsetDateTime.parse("2020-10-31T05:05:05Z"))
        .device(DeviceFixture.getDeviceModel());
  }

  public static EncoderModel getEncoderModelWithOutputChannel() {
    return new EncoderModel()
        .serialNumber(SERIAL_NUMBER)
        .lastCommunication(OffsetDateTime.parse("2020-10-31T05:05:05Z"))
        .device(DeviceFixture.getDeviceModel())
        .output(List.of(ChannelFixture.getOutputChannelModel()));
  }

  public static List<EncoderModel> getEncoderModels() {
    return List.of(getEncoderModelWithOutputChannel());
  }
}
