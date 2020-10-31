package org.beanpod.switchboard.fixture;

import org.beanpod.switchboard.dto.StreamDTO;

public class StreamEntityFixture {
    public static StreamDTO getStreamDto(){
        return new StreamDTO(1, "asd", "asd");
    }
}
