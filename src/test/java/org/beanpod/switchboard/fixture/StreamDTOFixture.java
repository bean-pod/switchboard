package org.beanpod.switchboard.fixture;

import com.switchboard.app.dto.StreamDTO;
import org.beanpod.switchboard.dto.StreamDTO;

import java.util.List;

public class StreamDTOFixture {

    public static Long UUID = 1234L;


    public static List<Long> getStreamList(){
        return List.of(
                UUID
        );
    }

    public static StreamDTO getStreamDto(){
        return new StreamDTO(1, "asd", "asd");
    }
}
