package org.beanpod.switchboard.fixture;

import java.util.List;

public class StreamDTOFixture {

    public static Long UUID = 1234L;


    public static List<Long> getStreamList(){
        return List.of(
                UUID
        );
    }
}
