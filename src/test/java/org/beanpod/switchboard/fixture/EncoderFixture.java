package org.beanpod.switchboard.fixture;

import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.EncoderEntity;

import java.util.ArrayList;
import java.util.List;

public class EncoderFixture {
    public static EncoderEntity getEncoder1(DeviceEntity device1){
        return new EncoderEntity("1", device1);
    }

    public static EncoderEntity getEncoder2(DeviceEntity device2){
        return new EncoderEntity("2", device2);
    }

    public static List<EncoderEntity> getListOfEncoder(EncoderEntity encoder1, EncoderEntity encoder2){
        //Adding stubbed objects to the list that should be returned when getEncoders is called
        List<EncoderEntity> listOfEncoders= new ArrayList<>();
        listOfEncoders.add(encoder1);
        listOfEncoders.add(encoder2);

        return listOfEncoders;
    }
}