package org.beanpod.switchboard.fixture;

import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.DeviceEntity;

import java.util.ArrayList;
import java.util.List;

public class DecoderFixture {
    public static DecoderEntity getDecoder1(DeviceEntity device1){
        return new DecoderEntity("1", device1);
    }

    public static DecoderEntity getDecoder2(DeviceEntity device2){
        return new DecoderEntity("1", device2);
    }

    public static List<DecoderEntity> getListOfDecoders(DecoderEntity decoder1, DecoderEntity decoder2){
        //Adding stubbed objects to the list that should be returned when getDecoders is called
        List<DecoderEntity> listOfDecoders= new ArrayList<>();
        listOfDecoders.add(decoder1);
        listOfDecoders.add(decoder2);

        return listOfDecoders;
    }

    public static DecoderDTO getDecoderDto(){
        return new DecoderDTO(SERIAL_NUMBER, DeviceFixture.getDeviceDto());
    }

    public static DecoderModel getDecoderModel(){
        return new DecoderModel()
                .serialNumber(SERIAL_NUMBER)
                .device(DeviceFixture.getDeviceModel());
    }
}