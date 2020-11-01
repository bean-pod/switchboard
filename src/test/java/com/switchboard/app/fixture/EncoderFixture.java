package com.switchboard.app.fixture;

import com.switchboard.app.entity.ChannelEntity;
import com.switchboard.app.entity.DeviceEntity;
import com.switchboard.app.entity.EncoderEntity;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class EncoderFixture {

    private static String pattern = "yyyy-MM-dd HH:mm:ss";
    private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

    public static EncoderEntity getEncoder1(DeviceEntity device, Set<ChannelEntity> setOfChannels) throws ParseException {
        return new EncoderEntity("1",
                simpleDateFormat.parse("2020-10-31 05:05:05"),
                device,
                setOfChannels);
    }

    public static EncoderEntity getEncoder2(DeviceEntity device, Set<ChannelEntity> setOfChannels) throws ParseException {
        return new EncoderEntity("2",
                simpleDateFormat.parse("2020-10-31 05:05:05"),
                device,
                setOfChannels);
    }

    public static List<EncoderEntity> getListOfEncoder(EncoderEntity encoder1, EncoderEntity encoder2){
        //Adding stubbed objects to the list that should be returned when getEncoders is called
        List<EncoderEntity> listOfEncoders= new ArrayList<>();
        listOfEncoders.add(encoder1);
        listOfEncoders.add(encoder2);

        return listOfEncoders;
    }
}