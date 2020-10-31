package org.beanpod.switchboard.controller;

import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.entity.mapper.StreamMapper;
import org.beanpod.switchboard.fixture.StreamDTOFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.StreamModel;
import org.springframework.http.HttpStatus;
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
        when(streamService.getStreams()).thenReturn(StreamFixture.getIdList());

        //when
        ResponseEntity<List<Long>> result = streamController.getStreams();

        //then
        assertNotNull(result);
        List<Long> responseBody = result.getBody();
        assertEquals(responseBody.get(0), StreamFixture.ID);
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

    @Test
    public void testGetStreamById(){
        //given
        StreamDTO streamDTO = StreamFixture.getStreamDto();
        when(streamService.getStreamById(StreamFixture.ID)).thenReturn(streamDTO);
        when(streamMapper.toModel(streamDTO)).thenReturn(StreamFixture.getStreamModel());

        //when
        ResponseEntity<StreamModel> result = streamController.getStreamById(StreamFixture.ID);

        //then
        assertEquals(result.getStatusCode(), HttpStatus.OK);
        assertNotNull(result);
        assertNotNull(result.getBody());
        StreamModel responseBody = result.getBody();
        assertEquals(responseBody.getId(), StreamFixture.ID);
        assertEquals(responseBody.getDecoder().getSerialNumber(), DecoderFixture.SERIAL_NUMBER);
        assertEquals(responseBody.getEncoder().getSerialNumber(), EncoderFixture.SERIAL_NUMBER);
    }

    @Test
    public void testCreateStream(){
        //when
        ResponseEntity<Void> result = streamController.createStream(StreamFixture.getCreateStreamRequest());

        //then
        assertEquals(result.getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void testDeleteStream(){
        //when
        ResponseEntity<Void> result = streamController.deleteStream(StreamFixture.ID);

        //then
        assertEquals(result.getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void testUpdateStream(){
        //given
        StreamModel streamModel = StreamFixture.getStreamModel();
        when(streamMapper.toDto(streamModel)).thenReturn(StreamFixture.getStreamDto());

        //when
        ResponseEntity<Void> result = streamController.updateStream(streamModel);

        //then
        assertEquals(result.getStatusCode(), HttpStatus.OK);
    }
}
