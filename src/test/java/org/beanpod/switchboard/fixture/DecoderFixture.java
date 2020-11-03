package org.beanpod.switchboard.fixture;

import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.DeviceEntity;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class DecoderFixture {

    private static String pattern = "yyyy-MM-dd HH:mm:ss";
    private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
    static private Set<ChannelEntity> setOfChannels = ChannelFixture.getSetOfChannels();

    public static DecoderEntity getDecoder1(DeviceEntity device) throws ParseException {
        return new DecoderEntity("1",
                simpleDateFormat.parse("2020-10-31 05:05:05"),
                device,
                setOfChannels);
    }

    public static DecoderEntity getDecoder2(DeviceEntity device) throws ParseException {
        return new DecoderEntity("1",
                simpleDateFormat.parse("2020-10-31 05:05:05"),
                device,
                setOfChannels);
    }

    public static List<DecoderEntity> getListOfDecoders(DecoderEntity decoder1, DecoderEntity decoder2){
        //Adding stubbed objects to the list that should be returned when getDecoders is called
        List<DecoderEntity> listOfDecoders= new ArrayList<>();
        listOfDecoders.add(decoder1);
        listOfDecoders.add(decoder2);

        return listOfDecoders;
    }
}