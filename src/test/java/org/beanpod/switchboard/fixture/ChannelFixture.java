package org.beanpod.switchboard.fixture;

import org.beanpod.switchboard.entity.ChannelEntity;

import java.util.HashSet;
import java.util.Set;

public class ChannelFixture {

    public static ChannelEntity getChannel1(){
        return new ChannelEntity( (long)1,"local",8080,null,null);
    }

    public static ChannelEntity getChannel2(){
        return new ChannelEntity( (long)2,"Dev",9090, null,null    );
    }

    public static Set<ChannelEntity> getSetOfChannels(){
        Set<ChannelEntity> setOfChannels= new HashSet<>();
        setOfChannels.add(getChannel1());
        setOfChannels.add(getChannel1());
        return setOfChannels;
    }
}
