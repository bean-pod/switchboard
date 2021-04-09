package org.beanpod.switchboard.fixture;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import lombok.SneakyThrows;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.openapitools.model.DecoderModel;

public class DecoderFixture {

  public static final String SERIAL_NUMBER = "1";
  public static final String SERIAL_NUMBER2 = "2";
  private static final Set<InputChannelEntity> setOfChannels =
      ChannelFixture.getInputChannelEntities();
  private static final Set<InputChannelDto> setOfDtoChannels = ChannelFixture.getInputChannelDtos();

  @SneakyThrows
  public static DecoderEntity getDecoderEntity1() {
    return DecoderEntity.builder()
        .serialNumber(SERIAL_NUMBER)
        .lastCommunication(DateFixture.getDate())
        .device(DeviceFixture.getDevice1())
        .input(setOfChannels)
        .build();
  }

  @SneakyThrows
  public static DecoderEntity getDecoderEntity2() {
    return DecoderEntity.builder()
        .serialNumber(SERIAL_NUMBER2)
        .lastCommunication(DateFixture.getDate())
        .device(DeviceFixture.getDevice2())
        .input(setOfChannels)
        .build();
  }

  public static List<DecoderEntity> getListOfDecoders() {
    List<DecoderEntity> listOfDecoders = new ArrayList<>();
    listOfDecoders.add(getDecoderEntity1());
    listOfDecoders.add(getDecoderEntity2());
    return listOfDecoders;
  }

  public static List<DecoderDto> getDecoderDtos() {
    return List.of(getDecoderDto());
  }

  @SneakyThrows
  public static DecoderDto getDecoderDto() {
    return DecoderDto.builder()
        .serialNumber(SERIAL_NUMBER)
        .lastCommunication(DateFixture.getDate())
        .device(DeviceFixture.getDeviceDto())
        .input(setOfDtoChannels)
        .build();
  }

  public static DecoderModel getDecoderModel() {
    return new DecoderModel()
        .serialNumber(SERIAL_NUMBER)
        .lastCommunication(DateFixture.getOffsetDateTime())
        .device(DeviceFixture.getDeviceModel());
  }

  public static DecoderModel getDecoderModelWithInputChannel() {
    return new DecoderModel()
        .serialNumber(SERIAL_NUMBER)
        .lastCommunication(DateFixture.getOffsetDateTime())
        .device(DeviceFixture.getDeviceModel())
        .input(List.of(ChannelFixture.getInputChannelModel()));
  }

  public static List<DecoderModel> getDecoderModels(){
    return List.of(
        getDecoderModelWithInputChannel()
    );
  }
}
