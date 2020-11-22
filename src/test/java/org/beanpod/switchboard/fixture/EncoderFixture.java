package org.beanpod.switchboard.fixture;

import lombok.SneakyThrows;
import org.beanpod.switchboard.dto.EncoderDTO;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.openapitools.model.EncoderModel;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class EncoderFixture {
    public static final String SERIAL_NUMBER = "1";
    public static final String SERIAL_NUMBER2 = "2";
    private static String pattern = "yyyy-MM-dd HH:mm:ss";
    private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
    static private Set<OutputChannelEntity> setOfChannels = ChannelFixture.getOutputChannelEntities();

    @SneakyThrows
    public static EncoderEntity getEncoderEntity1() {
        return EncoderEntity.builder()
                .serialNumber(SERIAL_NUMBER)
                .lastCommunication(simpleDateFormat.parse("2020-10-31 05:05:05"))
                .device(DeviceFixture.getDevice1())
                .output(null)
                .build();
    }

    @SneakyThrows
    public static EncoderEntity getEncoderEntity2() {
        return EncoderEntity.builder()
                .serialNumber(SERIAL_NUMBER2)
                .lastCommunication(simpleDateFormat.parse("2020-10-31 05:05:05"))
                .device(DeviceFixture.getDevice2())
                .output(null)
                .build();
    }

    public static List<EncoderEntity> getListOfEncoder() {
        List<EncoderEntity> listOfEncoders = new ArrayList<>();
        listOfEncoders.add(getEncoderEntity1());
        listOfEncoders.add(getEncoderEntity2());
        return listOfEncoders;
    }

    public static List<EncoderDTO> getEncoderDtos() {
        return List.of(
                getEncoderDto()
        );
    }

    @SneakyThrows
    public static EncoderDTO getEncoderDto(){
        return EncoderDTO.builder()
                .serialNumber(SERIAL_NUMBER)
                .lastCommunication(simpleDateFormat.parse("2020-10-31 05:05:05"))
                .device(DeviceFixture.getDeviceDto())
                .output(null)
                .build();
    }

    public static EncoderModel getEncoderModel() {
        return new EncoderModel()
                .serialNumber(SERIAL_NUMBER)
                .device(DeviceFixture.getDeviceModel());
    }
}