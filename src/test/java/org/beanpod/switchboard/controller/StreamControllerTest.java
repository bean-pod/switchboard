package org.beanpod.switchboard.controller;

import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.entity.mapper.StreamMapper;
import org.beanpod.switchboard.fixture.StreamDTOFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class StreamControllerTest {
    private StreamController streamController;

    @Mock
    private StreamDaoImpl streamService;
    @Mock
    private StreamMapper streamMapper;

    @BeforeEach
    public void setup(){
        MockitoAnnotations.initMocks(this);

        streamController = new StreamController(streamService, streamMapper);
    }

    @Test
    public void testGetStreams(){
        //given
        when(streamService.getStreams()).thenReturn(StreamDTOFixture.getStreamList());

        //when
        ResponseEntity<List<Long>> result = streamController.getStreams();

        //then
        assertNotNull(result);
        List<Long> responseBody = result.getBody();
        assertEquals(responseBody.get(0), StreamDTOFixture.UUID);
    }

    @Test
    public void testGetStreamsDtoReturnsNull(){
        //given
        when(streamService.getStreams()).thenReturn(null);

        //when & then
        RuntimeException exception = assertThrows(RuntimeException.class, () ->
            streamController.getStreams()
        );

        assertEquals(StreamController.UNKNOWN_ERROR_MESSAGE, exception.getMessage());
    }

    @Test
    public void testGetStreamsThrowsException() {
        //given
        when(streamService.getStreams()).thenThrow(new RuntimeException());

        //when & then
        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                streamController.getStreams()
        );
    }
}
