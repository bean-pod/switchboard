package org.beanpod.switchboard.controller;

import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.StreamDTO;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.EncoderFixture;
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
    private StreamDaoImpl channelService;
    @Mock
    private StreamMapper channelMapper;

    @BeforeEach
    public void setup(){
        MockitoAnnotations.initMocks(this);

        streamController = new StreamController(channelService, channelMapper);
    }

    @Test
    public void testGetChannels(){
        //given
        when(channelService.getStreams()).thenReturn(StreamFixture.getIdList());

        //when
        ResponseEntity<List<Long>> result = streamController.getStreams();

        //then
        assertNotNull(result);
        List<Long> responseBody = result.getBody();
        assertEquals(responseBody.get(0), StreamFixture.ID);
    }

    @Test
    public void testGetChannelsDtoReturnsNull(){
        //given
        when(channelService.getStreams()).thenReturn(null);

        //when & then
        RuntimeException exception = assertThrows(RuntimeException.class, () ->
            streamController.getStreams()
        );

        assertEquals(StreamController.UNKNOWN_ERROR_MESSAGE, exception.getMessage());
    }

    @Test
    public void testGetChannelsThrowsException() {
        //given
        when(channelService.getStreams()).thenThrow(new RuntimeException());

        //when & then
        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                streamController.getStreams()
        );
    }

    @Test
    public void testGetChannelById(){
        //given
        StreamDTO streamDto = StreamFixture.getStreamDto();
        when(channelService.getStreamById(StreamFixture.ID)).thenReturn(streamDto);
        when(channelMapper.toModel(streamDto)).thenReturn(StreamFixture.getStreamModel());

        //when
        ResponseEntity<StreamModel> result = streamController.getStreamById(StreamFixture.ID);

        //then
        assertEquals(result.getStatusCode(), HttpStatus.OK);
        assertNotNull(result);
        assertNotNull(result.getBody());
        StreamModel responseBody = result.getBody();
        assertEquals(responseBody.getId(), StreamFixture.ID);
        assertEquals(responseBody.getInputChannel(), ChannelFixture.getInputChannelModel());
        assertEquals(responseBody.getOutputChannel(), ChannelFixture.getOutputChannelModel());
    }

    @Test
    public void testCreateChannel(){
        //when
        ResponseEntity<Void> result = streamController.createStream(StreamFixture.getCreateStreamRequest());

        //then
        assertEquals(result.getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void testDeleteChannel(){
        //when
        ResponseEntity<Void> result = streamController.deleteStream(StreamFixture.ID);

        //then
        assertEquals(result.getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void testUpdateChannel(){
        //given
        StreamModel streamModel = StreamFixture.getStreamModel();
        when(channelMapper.toDto(streamModel)).thenReturn(StreamFixture.getStreamDto());

        //when
        ResponseEntity<Void> result = streamController.updateStream(streamModel);

        //then
        assertEquals(result.getStatusCode(), HttpStatus.OK);
    }
}
