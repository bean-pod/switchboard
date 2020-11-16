//package org.beanpod.switchboard.dao;
//
//import org.beanpod.switchboard.dto.InputChannelDTO;
//import org.beanpod.switchboard.dto.OutputChannelDTO;
//import org.beanpod.switchboard.dto.mapper.InputChannelMapper;
//import org.beanpod.switchboard.dto.mapper.OutputChannelMapper;
//import org.beanpod.switchboard.entity.InputChannelEntity;
//import org.beanpod.switchboard.entity.OutputChannelEntity;
//import org.beanpod.switchboard.fixture.ChannelFixture;
//import org.beanpod.switchboard.fixture.DeviceFixture;
//import org.beanpod.switchboard.repository.InputChannelRepository;
//import org.beanpod.switchboard.repository.OutputChannelRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mock;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.when;
//import static org.mockito.MockitoAnnotations.initMocks;
//
//public class ChannelDaoImplTest {
//    private ChannelDaoImpl channelService;
//
//    @Mock
//    private InputChannelRepository inputChannelRepository;
//    @Mock
//    private InputChannelMapper inputChannelMapper;
//    @Mock
//    private OutputChannelRepository outputChannelRepository;
//    @Mock
//    private OutputChannelMapper outputChannelMapper;
//
//    @BeforeEach
//    public void setup(){
//        initMocks(this);
//        channelService = new ChannelDaoImpl(inputChannelRepository, inputChannelMapper, outputChannelRepository, outputChannelMapper);
//    }
//
//    @Test
//    public void testGetInputChannelById(){Z
//        //given
//        long inputChannelId = ChannelFixture.INPUT_CHANNEL_ID;
//        InputChannelDTO inputChannelDTO = ChannelFixture.getInputChannelDto();
//        InputChannelEntity inputChannelEntity = ChannelFixture.getInputChannelEntity();
//
//        when(inputChannelRepository.getOne(inputChannelId)).thenReturn(inputChannelEntity);
//        when(inputChannelMapper.toDto(inputChannelEntity)).thenReturn(inputChannelDTO);
//
//        //when
//        InputChannelDTO result = channelService.getInputChannelById(inputChannelId);
//
//        //then
//        assertEquals(ChannelFixture.INPUT_CHANNEL_ID, result.getId());
//        assertEquals(ChannelFixture.NAME, result.getName());
//        assertEquals(ChannelFixture.PORT, result.getPort());
//    }
//
//    @Test
//    public void testSaveInputChannel(){
//        //given
//        InputChannelDTO inputChannelDto = ChannelFixture.getInputChannelDto();
//        InputChannelEntity inputChannelEntity = ChannelFixture.getInputChannelEntity();
//
//        when(inputChannelMapper.toEntity(inputChannelDto)).thenReturn(inputChannelEntity);
//
//        //when
//        channelService.saveInputChannel(inputChannelDto);
//
//        //then
//        verify(inputChannelRepository).save(inputChannelEntity);
//    }
//
//    @Test
//    public void testGetOutputChannelById(){
//        //given
//        long outputChannelId = ChannelFixture.OUTPUT_CHANNEL_ID;
//        OutputChannelDTO outputChannelDTO = ChannelFixture.getOutputChannelDto();
//        OutputChannelEntity outputChannelEntity = ChannelFixture.getOutputChannelEntity();
//
//        when(outputChannelRepository.getOne(outputChannelId)).thenReturn(outputChannelEntity);
//        when(outputChannelMapper.toDto(outputChannelEntity)).thenReturn(outputChannelDTO);
//
//        //when
//        OutputChannelDTO result = channelService.getOutputChannelById(outputChannelId);
//
//        //then
//        assertEquals(ChannelFixture.OUTPUT_CHANNEL_ID, result.getId());
//    }
//
//    @Test
//    public void testSaveOutputChannel(){
//        //given
//        OutputChannelDTO outputChannelDto = ChannelFixture.getOutputChannelDto();
//        OutputChannelEntity outputChannelEntity = ChannelFixture.getOutputChannelEntity();
//
//        when(outputChannelMapper.toEntity(outputChannelDto)).thenReturn(outputChannelEntity);
//
//        //when
//        channelService.saveOutputChannel(outputChannelDto);
//
//        //then
//        verify(outputChannelRepository).save(outputChannelEntity);
//    }
//}
