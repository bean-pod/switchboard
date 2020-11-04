package org.beanpod.switchboard.dao;

import org.beanpod.switchboard.dto.ChannelDTO;
import org.beanpod.switchboard.dto.DecoderDTO;
import org.beanpod.switchboard.dto.EncoderDTO;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
import org.beanpod.switchboard.dto.mapper.DecoderMapper;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.beanpod.switchboard.repository.ChannelRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.openapitools.model.CreateChannelRequest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class ChannelDaoImplTest {
    private ChannelDaoImpl channelService;

    @Mock
    private ChannelRepository channelRepository;
    @Mock
    private ChannelMapper channelMapper;
    @Mock
    private DecoderDaoImpl decoderService;
    @Mock
    private EncoderDaoImpl encoderService;
    @Mock
    private DecoderMapper decoderMapper;
    @Mock
    private EncoderMapper encoderMapper;

    @BeforeEach
    public void setup(){
        initMocks(this);
        channelService = new ChannelDaoImpl(channelRepository, channelMapper, decoderService, encoderService, decoderMapper, encoderMapper);
    }

    @Test
    public void testGetChannels(){
        //given
        List<Long> channelIdList = ChannelFixture.getIdList();
        when(channelRepository.getAllId()).thenReturn(channelIdList);

        //when
        List<Long> result = channelService.getChannels();

        //then
        assertEquals(result, ChannelFixture.getIdList());
    }

    @Test
    public void testGetChannelById(){
        long channelId = ChannelFixture.ID;
        String decoderSerialNumber = DecoderFixture.SERIAL_NUMBER;
        String encoderSerialNumber = EncoderFixture.SERIAL_NUMBER;
        ChannelEntity channelEntity = ChannelFixture.getChannelEntity();
        ChannelDTO channelDto = ChannelFixture.getChannelDto();

        when(channelRepository.getOne(channelId)).thenReturn(channelEntity);
        when(channelMapper.toDto(channelEntity)).thenReturn(channelDto);

        //when
        ChannelDTO result = channelService.getChannelById(channelId);

        //then
        assertEquals(result.getId(), channelId);
        assertEquals(result.getName(), ChannelFixture.NAME);
        assertEquals(result.getPort(), ChannelFixture.PORT);
        assertEquals(result.getDecoder().getSerialNumber(), decoderSerialNumber);
        assertEquals(result.getEncoder().getSerialNumber(), encoderSerialNumber);
    }

    @Test
    public void testCreateChannel(){
        //given
        CreateChannelRequest createChannelRequest = ChannelFixture.getCreateChannelRequest();
        String decoderSerialNumber = DecoderFixture.SERIAL_NUMBER;
        String encoderSerialNumber = EncoderFixture.SERIAL_NUMBER;
        Optional<DecoderEntity> decoderEntity = Optional.of(DecoderFixture.getDecoder1(DeviceFixture.getDevice1()));
        Optional<EncoderEntity> encoderEntity = Optional.of(EncoderFixture.getEncoder1(DeviceFixture.getDevice1()));
        DecoderDTO decoderDTO = DecoderFixture.getDecoderDto();
        EncoderDTO encoderDto = EncoderFixture.getEncoderDto();
        ChannelEntity channelEntity = ChannelFixture.getChannelEntity();

        when(decoderService.findDecoder(decoderSerialNumber)).thenReturn(decoderEntity);
        when(decoderMapper.toDecoderDTO(decoderEntity.get())).thenReturn(decoderDTO);
        when(encoderService.findEncoder(encoderSerialNumber)).thenReturn(encoderEntity);
        when(encoderMapper.toEncoderDTO(encoderEntity.get())).thenReturn(encoderDto);
        when(channelRepository.existsDuplicate(encoderSerialNumber, decoderSerialNumber, createChannelRequest.getPort())).thenReturn(false);
        when(channelMapper.toEntity(any())).thenReturn(channelEntity);

        //when
        channelService.createChannel(createChannelRequest);

        //then
        verify(channelRepository).save(channelEntity);
    }

    @Test
    public void testDeleteChannel(){
        //given
        long channelId = ChannelFixture.ID;

        //when
        channelService.deleteChannel(channelId);

        //then
        verify(channelRepository).deleteById(channelId);
    }

    @Test
    public void testUpdateChannel(){
        //given
        long channelId = ChannelFixture.ID;
        ChannelDTO channelDto = ChannelFixture.getChannelDto();
        ChannelEntity channelEntity = ChannelFixture.getChannelEntity();

        when(channelRepository.existsById(channelId)).thenReturn(true);
        when(channelMapper.toEntity(channelDto)).thenReturn(channelEntity);

        //when
        channelService.updateChannel(channelDto);

        //verify
        verify(channelRepository).save(channelEntity);
    }

}
