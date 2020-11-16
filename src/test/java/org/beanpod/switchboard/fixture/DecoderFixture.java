package org.beanpod.switchboard.fixture;

import org.beanpod.switchboard.dto.DecoderDTO;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.openapitools.model.DecoderModel;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class DecoderFixture {
    public static final String SERIAL_NUMBER = "1";
    private static String pattern = "yyyy-MM-dd HH:mm:ss";
    private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
    static private Set<InputChannelEntity> setOfChannels = ChannelFixture.getInputChannelEntities();

    public static DecoderEntity getDecoder1(DeviceEntity device){
        try {
            return new DecoderEntity("1",
                    simpleDateFormat.parse("2020-10-31 05:05:05"),
                    device);
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException("Unable to parse the date in Decoder 1");
        }
    }

    public static DecoderEntity getDecoder2(DeviceEntity device){
        try {
            return new DecoderEntity("1",
                    simpleDateFormat.parse("2020-10-31 05:05:05"),
                    device);
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException("Unable to parse the date in Decoder 1");
        }
    }

    public static List<DecoderEntity> getListOfDecoders(DecoderEntity decoder1, DecoderEntity decoder2){
        //Adding stubbed objects to the list that should be returned when getDecoders is called
        List<DecoderEntity> listOfDecoders= new ArrayList<>();
        listOfDecoders.add(decoder1);
        listOfDecoders.add(decoder2);

        return listOfDecoders;
    }

    public static List<DecoderDTO> getDecoderDtos(){
        return List.of(
                getDecoderDto()
        );
    }

    public static DecoderDTO getDecoderDto(){
        return DecoderDTO.builder()
                .serialNumber(SERIAL_NUMBER)
                .device(DeviceFixture.getDeviceDto())
                .build();
    }

    public static DecoderModel getDecoderModel(){
        return new DecoderModel()
                .serialNumber(SERIAL_NUMBER)
                .device(DeviceFixture.getDeviceModel());
    }
}