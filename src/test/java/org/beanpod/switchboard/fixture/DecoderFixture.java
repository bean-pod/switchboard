package org.beanpod.switchboard.fixture;

import lombok.SneakyThrows;
import org.beanpod.switchboard.dto.DecoderDTO;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.openapitools.model.DecoderModel;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class DecoderFixture {
    public static final String SERIAL_NUMBER = "1";
    public static final String SERIAL_NUMBER2 = "2";
    private static String pattern = "yyyy-MM-dd HH:mm:ss";
    private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
    static private Set<InputChannelEntity> setOfChannels = ChannelFixture.getInputChannelEntities();

    @SneakyThrows
    public static DecoderEntity getDecoderEntity1() {
        return DecoderEntity.builder()
                .serialNumber(SERIAL_NUMBER)
                .lastCommunication(simpleDateFormat.parse("2020-10-31 05:05:05"))
                .device(DeviceFixture.getDevice1())
                .input(null)
                .build();
    }

    @SneakyThrows
    public static DecoderEntity getDecoderEntity2() {
        return DecoderEntity.builder()
                .serialNumber(SERIAL_NUMBER2)
                .lastCommunication(simpleDateFormat.parse("2020-10-31 05:05:05"))
                .device(DeviceFixture.getDevice1())
                .input(null)
                .build();
    }

    public static List<DecoderEntity> getListOfDecoders() {
        List<DecoderEntity> listOfDecoders = new ArrayList<>();
        listOfDecoders.add(getDecoderEntity1());
        listOfDecoders.add(getDecoderEntity2());
        return listOfDecoders;
    }

    public static List<DecoderDTO> getDecoderDtos() {
        return List.of(
                getDecoderDto()
        );
    }

    @SneakyThrows
    public static DecoderDTO getDecoderDto() {
        return DecoderDTO.builder().serialNumber(SERIAL_NUMBER)
                .lastCommunication(simpleDateFormat.parse("2020-10-31 05:05:05"))
                .device(DeviceFixture.getDeviceDto())
                .input(null)
                .build();
    }

    public static DecoderModel getDecoderModel() {
        return new DecoderModel()
                .serialNumber(SERIAL_NUMBER)
                .device(DeviceFixture.getDeviceModel());
    }
}