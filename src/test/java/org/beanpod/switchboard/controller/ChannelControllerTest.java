package org.beanpod.switchboard.controller;

import org.beanpod.switchboard.dao.ChannelDaoImpl;
import org.beanpod.switchboard.dto.ChannelDTO;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.ChannelModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class ChannelControllerTest {
    private ChannelController channelController;

    @Mock
    private ChannelDaoImpl channelService;
    @Mock
    private ChannelMapper channelMapper;

    @BeforeEach
    public void setup(){
        MockitoAnnotations.initMocks(this);

        channelController = new ChannelController(channelService, channelMapper);
    }

    @Test
    public void testGetChannels(){
        //given
        when(channelService.getChannels()).thenReturn(ChannelFixture.getIdList());

        //when
        ResponseEntity<List<Long>> result = channelController.getChannels();

        //then
        assertNotNull(result);
        List<Long> responseBody = result.getBody();
        assertEquals(responseBody.get(0), ChannelFixture.ID);
    }

    @Test
    public void testGetChannelsDtoReturnsNull(){
        //given
        when(channelService.getChannels()).thenReturn(null);

        //when & then
        RuntimeException exception = assertThrows(RuntimeException.class, () ->
            channelController.getChannels()
        );

        assertEquals(ChannelController.UNKNOWN_ERROR_MESSAGE, exception.getMessage());
    }

    @Test
    public void testGetChannelsThrowsException() {
        //given
        when(channelService.getChannels()).thenThrow(new RuntimeException());

        //when & then
        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                channelController.getChannels()
        );
    }

    @Test
    public void testGetChannelById(){
        //given
        ChannelDTO channelDTO = ChannelFixture.getChannelDto();
        when(channelService.getChannelById(ChannelFixture.ID)).thenReturn(channelDTO);
        when(channelMapper.toModel(channelDTO)).thenReturn(ChannelFixture.getChannelModel());

        //when
        ResponseEntity<ChannelModel> result = channelController.getChannelById(ChannelFixture.ID);

        //then
        assertEquals(result.getStatusCode(), HttpStatus.OK);
        assertNotNull(result);
        assertNotNull(result.getBody());
        ChannelModel responseBody = result.getBody();
        assertEquals(responseBody.getId(), ChannelFixture.ID);
        assertEquals(responseBody.getName(), ChannelFixture.NAME);
        assertEquals(responseBody.getPort(), ChannelFixture.PORT);
        assertEquals(responseBody.getDecoder().getSerialNumber(), DecoderFixture.SERIAL_NUMBER);
        assertEquals(responseBody.getEncoder().getSerialNumber(), EncoderFixture.SERIAL_NUMBER);
    }

    @Test
    public void testCreateChannel(){
        //when
        ResponseEntity<Void> result = channelController.createChannel(ChannelFixture.getCreateChannelRequest());

        //then
        assertEquals(result.getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void testDeleteChannel(){
        //when
        ResponseEntity<Void> result = channelController.deleteChannel(ChannelFixture.ID);

        //then
        assertEquals(result.getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void testUpdateChannel(){
        //given
        ChannelModel channelModel = ChannelFixture.getChannelModel();
        when(channelMapper.toDto(channelModel)).thenReturn(ChannelFixture.getChannelDto());

        //when
        ResponseEntity<Void> result = channelController.updateChannel(channelModel);

        //then
        assertEquals(result.getStatusCode(), HttpStatus.OK);
    }
}
