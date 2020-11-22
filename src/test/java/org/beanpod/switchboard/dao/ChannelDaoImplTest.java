package org.beanpod.switchboard.dao;

import org.beanpod.switchboard.dto.ChannelDTO;
import org.beanpod.switchboard.dto.InputChannelDTO;
import org.beanpod.switchboard.dto.OutputChannelDTO;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
import org.beanpod.switchboard.dto.mapper.InputChannelMapper;
import org.beanpod.switchboard.dto.mapper.OutputChannelMapper;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.repository.ChannelRepository;
import org.beanpod.switchboard.repository.InputChannelRepository;
import org.beanpod.switchboard.repository.OutputChannelRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

class ChannelDaoImplTest {

    @InjectMocks
    private ChannelDaoImpl channelService;

    @Mock
    private InputChannelRepository inputChannelRepository;
    @Mock
    private OutputChannelRepository outputChannelRepository;
    @Mock
    private InputChannelMapper inputChannelMapper;
    @Mock
    private OutputChannelMapper outputChannelMapper;
    @Mock
    private ChannelRepository channelRepository;
    @Mock
    private ChannelMapper channelMapper;


    //stubbed DeviceEntity object
    static private ChannelEntity channel;
    static private InputChannelEntity input;
    static private InputChannelDTO inputDto;
    static private OutputChannelEntity output;
    static private OutputChannelDTO outputDto;
    static private ChannelDTO channelDto;
    static private List<ChannelEntity> listOfChannels;

    @BeforeEach
    public void setup() {
        initMocks(this);
    }

    @BeforeEach
    void setupChannelFixture() {
        channel = ChannelFixture.getChannelEntity();
        input = ChannelFixture.getInputChannelEntity();
        inputDto = ChannelFixture.getInputChannelDto();
        output = ChannelFixture.getOutputChannelEntity();
        outputDto = ChannelFixture.getOutputChannelDto();
        channelDto = ChannelFixture.getChannelDto();
        listOfChannels = ChannelFixture.getListOfChannels();
    }

    @Test
    void testGetChannels() {
        when(channelRepository.findAll()).thenReturn(listOfChannels);
        List<ChannelEntity> channelEntities = channelService.getChannels();
        assertEquals(listOfChannels, channelEntities);
    }

    @Test
    void testFindChannel() {
        when(channelMapper.toChannelDTO(any())).thenReturn(channelDto);
        when(channelMapper.toChannelEntity(any())).thenReturn(channel);
        when(channelRepository.findChannelEntitiesById(4569L)).thenReturn(java.util.Optional.of(channel));
        Optional<ChannelDTO> channelDTO = channelService.findChannel(4569L);
        assertEquals(channelDto, channelDTO.get());
    }

    @Test
    void testDeleteChannel() {
        when(channelRepository.deleteChannelEntitiesById(4569L)).thenReturn((long) 1);
        Long response = channelService.deleteChannel(4569L);
        assertEquals(1L, response);
    }

    @Test
    void testSaveChannel() {
        when(channelMapper.toChannelDTO(any())).thenReturn(channelDto);
        when(channelMapper.toChannelEntity(any())).thenReturn(channel);
        when(channelRepository.save(channel)).thenReturn(channel);
        ChannelDTO channelDTO = channelService.save(channelDto);
        assertEquals(channelDto, channelDTO);
    }

    @Test
    void testSaveInputChannel() {
        when(inputChannelMapper.toInputChannelDTO(any())).thenReturn(inputDto);
        when(inputChannelMapper.toInputChannelEntity(any())).thenReturn(input);
        when(inputChannelRepository.save(input)).thenReturn(input);
        InputChannelDTO inputChannelDTO = channelService.saveInputChannel(inputDto);
        assertEquals(inputDto, inputChannelDTO);
    }

    @Test
    void testSaveOutputChannel() {
        when(outputChannelMapper.toOutputChannelDTO(any())).thenReturn(outputDto);
        when(outputChannelMapper.toOutputChannelEntity(any())).thenReturn(output);
        when(outputChannelRepository.save(output)).thenReturn(output);
        OutputChannelDTO outputChannelDTO = channelService.saveOutputChannel(outputDto);
        assertEquals(outputDto, outputChannelDTO);
    }

    @Test
    void testGetOutputChannelById() {
        when(outputChannelRepository.getOne(4569L)).thenReturn(output);
        when(outputChannelMapper.toOutputChannelDTO(output)).thenReturn(outputDto);
        OutputChannelDTO outputChannelDTO = channelService.getOutputChannelById(4569L);
        assertEquals(outputDto, outputChannelDTO);
    }

    @Test
    void testGetInputChannelById() {
        when(inputChannelRepository.getOne(4569L)).thenReturn(input);
        when(inputChannelMapper.toInputChannelDTO(input)).thenReturn(inputDto);
        InputChannelDTO inputChannelDTO = channelService.getInputChannelById(4569L);
        assertEquals(inputDto, inputChannelDTO);
    }

    @Test
    void deleteOutputChannelById() {
        when(outputChannelRepository.deleteOutputChannelEntitiesById(4569L)).thenReturn(1L);
        Long response = channelService.deleteOutputChannelById(4569L);
        assertEquals(1L, response);
    }

    @Test
    void deleteInputChannelById() {
        when(inputChannelRepository.deleteInputChannelEntityById(4569L)).thenReturn(1L);
        Long response = channelService.deleteInputChannelById(4569L);
        assertEquals(1L, response);
    }
}
