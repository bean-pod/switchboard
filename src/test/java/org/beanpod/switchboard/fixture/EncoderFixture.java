package org.beanpod.switchboard.fixture;

import org.beanpod.switchboard.dto.EncoderDTO;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.openapitools.model.EncoderModel;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class EncoderFixture {
    public static final String  SERIAL_NUMBER = "1";
    private static String pattern = "yyyy-MM-dd HH:mm:ss";
    private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
    static private Set<OutputChannelEntity> setOfChannels = ChannelFixture.getOutputChannelEntities();

    public static EncoderEntity getEncoder1(DeviceEntity device){
        try {
            return new EncoderEntity(SERIAL_NUMBER,
                    simpleDateFormat.parse("2020-10-31 05:05:05"),
                    device);
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException("Unable to parse the date in Encoder 1");
        }
    }

    public static EncoderEntity getEncoder2(DeviceEntity device){
        try {
            return new EncoderEntity("2",
                    simpleDateFormat.parse("2020-10-31 05:05:05"),
                    device);
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException("Unable to parse the date in Encoder 2");
        }
    }

    public static List<EncoderEntity> getListOfEncoder(EncoderEntity encoder1, EncoderEntity encoder2){
        //Adding stubbed objects to the list that should be returned when getEncoders is called
        List<EncoderEntity> listOfEncoders= new ArrayList<>();
        listOfEncoders.add(encoder1);
        listOfEncoders.add(encoder2);

        return listOfEncoders;
    }

    public static List<EncoderDTO> getEncoderDtos(){
        return List.of(
                getEncoderDto()
        );
    }

    public static EncoderDTO getEncoderDto(){
        return EncoderDTO.builder()
                .serialNumber(SERIAL_NUMBER)
                .device(DeviceFixture.getDeviceDto())
                .build();
    }

    public static EncoderModel getEncoderModel() {
        return new EncoderModel()
                .serialNumber(SERIAL_NUMBER)
                .device(DeviceFixture.getDeviceModel());
    }
}