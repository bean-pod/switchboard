package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.beanpod.switchboard.dto.ChannelDto;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.repository.ChannelRepository;
import org.beanpod.switchboard.util.UserMockUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class ChannelDaoImplTest {

  // stubbed DeviceEntity object
  private static ChannelEntity channel;
  private static ChannelDto channelDto;
  private static List<ChannelEntity> listOfChannels;
  private static UserEntity user;
  @InjectMocks private ChannelDaoImpl channelDao;
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
    channelDto = ChannelFixture.getChannelDto();
    listOfChannels = ChannelFixture.getListOfChannels();
    user = UserFixture.getUserEntity();
  }

  @Test
  void testGetChannels() {
    when(channelRepository.findAll()).thenReturn(listOfChannels);
    List<ChannelEntity> channelEntities = channelDao.getChannels();
    assertEquals(listOfChannels, channelEntities);
  }

  @Test
  void testFindChannel() {
    when(channelMapper.toChannelDto(any())).thenReturn(channelDto);
    when(channelMapper.toChannelEntity(any())).thenReturn(channel);
    when(channelRepository.findChannelEntityById(ChannelFixture.CHANNEL_ID))
        .thenReturn(java.util.Optional.of(channel));
    Optional<ChannelDto> channelDTO = channelDao.findChannel(ChannelFixture.CHANNEL_ID);
    assertEquals(channelDto, channelDTO.get());
  }

  @Test
  void testDeleteChannel() {
    when(channelRepository.deleteChannelEntityById(ChannelFixture.CHANNEL_ID)).thenReturn((long) 1);
    Long response = channelDao.deleteChannel(ChannelFixture.CHANNEL_ID);
    assertEquals(1L, response);
  }

  @Test
  void testSaveChannel() {
    when(channelMapper.toChannelDto(any())).thenReturn(channelDto);
    when(channelMapper.toChannelEntity(any())).thenReturn(channel);
    when(channelRepository.save(channel)).thenReturn(channel);
    ChannelDto channelDTO = channelDao.save(channelDto);
    assertEquals(channelDto, channelDTO);
  }
}
