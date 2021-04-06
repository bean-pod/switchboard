package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.beanpod.switchboard.dto.ChannelDto;
import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
import org.beanpod.switchboard.dto.mapper.InputChannelMapper;
import org.beanpod.switchboard.dto.mapper.OutputChannelMapper;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.repository.ChannelRepository;
import org.beanpod.switchboard.repository.InputChannelRepository;
import org.beanpod.switchboard.repository.OutputChannelRepository;
import org.beanpod.switchboard.util.UserMockUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class ChannelDaoImplTest {

  // stubbed DeviceEntity object
  private static ChannelEntity channel;
  private static InputChannelEntity input;
  private static InputChannelDto inputDto;
  private static OutputChannelEntity output;
  private static OutputChannelDto outputDto;
  private static ChannelDto channelDto;
  private static List<ChannelEntity> listOfChannels;
  private static UserEntity user;
  @InjectMocks private ChannelDaoImpl channelService;
  @Mock private InputChannelRepository inputChannelRepository;
  @Mock private OutputChannelRepository outputChannelRepository;
  @Mock private InputChannelMapper inputChannelMapper;
  @Mock private OutputChannelMapper outputChannelMapper;
  @Mock private ChannelRepository channelRepository;
  @Mock private ChannelMapper channelMapper;
  @Mock private HttpServletRequest httpServletRequest;
  @Mock private UserPrincipal userPrincipal;
  @Mock private UserDaoImpl userDao;

  @BeforeEach
  public void setup() {
    setupChannelFixture();

    MockitoAnnotations.initMocks(this);

    UserMockUtil.mockUser(user, httpServletRequest, userPrincipal, userDao);
  }

  private void setupChannelFixture() {
    channel = ChannelFixture.getChannelEntity1();
    input = ChannelFixture.getInputChannelEntity();
    inputDto = ChannelFixture.getInputChannelDto();
    output = ChannelFixture.getOutputChannelEntity();
    outputDto = ChannelFixture.getOutputChannelDto();
    channelDto = ChannelFixture.getChannelDto();
    listOfChannels = ChannelFixture.getListOfChannels();
    user = UserFixture.getUserEntity();
  }

  @Test
  void testGetChannels() {
    when(channelRepository.findAll()).thenReturn(listOfChannels);
    List<ChannelEntity> channelEntities = channelService.getChannels();
    assertEquals(listOfChannels, channelEntities);
  }

  @Test
  void testFindChannel() {
    when(channelMapper.toChannelDto(any())).thenReturn(channelDto);
    when(channelMapper.toChannelEntity(any())).thenReturn(channel);
    when(channelRepository.findChannelEntitiesById(ChannelFixture.CHANNEL_ID))
        .thenReturn(java.util.Optional.of(channel));
    Optional<ChannelDto> channelDTO = channelService.findChannel(ChannelFixture.CHANNEL_ID);
    assertEquals(channelDto, channelDTO.get());
  }

  @Test
  void testDeleteChannel() {
    when(channelRepository.deleteChannelEntitiesById(ChannelFixture.CHANNEL_ID))
        .thenReturn((long) 1);
    Long response = channelService.deleteChannel(ChannelFixture.CHANNEL_ID);
    assertEquals(1L, response);
  }

  @Test
  void testSaveChannel() {
    when(channelMapper.toChannelDto(any())).thenReturn(channelDto);
    when(channelMapper.toChannelEntity(any())).thenReturn(channel);
    when(channelRepository.save(channel)).thenReturn(channel);
    ChannelDto channelDTO = channelService.save(channelDto);
    assertEquals(channelDto, channelDTO);
  }

  @Test
  void testSaveInputChannel() {
    when(inputChannelMapper.toInputChannelDto(any())).thenReturn(inputDto);
    when(inputChannelMapper.toInputChannelEntity(any())).thenReturn(input);
    when(inputChannelRepository.save(input)).thenReturn(input);
    InputChannelDto inputChannelDTO = channelService.saveInputChannel(inputDto);
    assertEquals(inputDto, inputChannelDTO);
  }

  @Test
  void testSaveOutputChannel() {
    when(outputChannelMapper.toOutputChannelDto(any())).thenReturn(outputDto);
    when(outputChannelMapper.toOutputChannelEntity(any())).thenReturn(output);
    when(outputChannelRepository.save(output)).thenReturn(output);
    OutputChannelDto outputChannelDTO = channelService.saveOutputChannel(outputDto);
    assertEquals(outputDto, outputChannelDTO);
  }

  @Test
  void testGetOutputChannelById() {
    when(outputChannelRepository.getOne(ChannelFixture.CHANNEL_ID)).thenReturn(output);
    when(outputChannelMapper.toOutputChannelDto(output)).thenReturn(outputDto);
    OutputChannelDto outputChannelDTO =
        channelService.getOutputChannelById(ChannelFixture.CHANNEL_ID);
    assertEquals(outputDto, outputChannelDTO);
  }

  @Test
  void testGetInputChannelById() {
    when(inputChannelRepository.getOne(ChannelFixture.CHANNEL_ID)).thenReturn(input);
    when(inputChannelMapper.toInputChannelDto(input)).thenReturn(inputDto);
    InputChannelDto inputChannelDTO = channelService.getInputChannelById(ChannelFixture.CHANNEL_ID);
    assertEquals(inputDto, inputChannelDTO);
  }

  @Test
  void deleteOutputChannelById() {
    when(outputChannelRepository.deleteOutputChannelEntitiesByEncoderDeviceUserAndId(
            user, ChannelFixture.CHANNEL_ID))
        .thenReturn(1L);
    Long response = channelService.deleteOutputChannelById(user, ChannelFixture.CHANNEL_ID);
    assertEquals(1L, response);
  }

  @Test
  void deleteInputChannelById() {
    when(inputChannelRepository.deleteInputChannelEntityByDecoderDeviceUserAndId(
            user, ChannelFixture.CHANNEL_ID))
        .thenReturn(1L);
    Long response = channelService.deleteInputChannelById(user, ChannelFixture.CHANNEL_ID);
    assertEquals(1L, response);
  }
}
