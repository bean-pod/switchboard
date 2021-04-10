package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.nio.file.attribute.UserPrincipal;
import javax.servlet.http.HttpServletRequest;
import org.beanpod.switchboard.dto.OutputChannelDto;
import org.beanpod.switchboard.dto.mapper.OutputChannelMapper;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.repository.OutputChannelRepository;
import org.beanpod.switchboard.util.UserMockUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class OutputChannelDaoImplTest {

  private static OutputChannelEntity output;
  private static OutputChannelDto outputDto;
  private static UserEntity user;
  @InjectMocks private OutputChannelDaoImpl outputChannelDao;
  @Mock private OutputChannelRepository outputChannelRepository;
  @Mock private OutputChannelMapper outputChannelMapper;
  @Mock private HttpServletRequest httpServletRequest;
  @Mock private UserPrincipal userPrincipal;
  @Mock private UserDaoImpl userDao;

  @BeforeEach
  public void setup() {
    setupOutputChannelFixture();

    MockitoAnnotations.initMocks(this);

    UserMockUtil.mockUser(user, httpServletRequest, userPrincipal, userDao);
  }

  private void setupOutputChannelFixture() {
    output = ChannelFixture.getOutputChannelEntity();
    outputDto = ChannelFixture.getOutputChannelDto();
    user = UserFixture.getUserEntity();
  }

  @Test
  void testSaveOutputChannel() {
    when(outputChannelMapper.toOutputChannelDto(any())).thenReturn(outputDto);
    when(outputChannelMapper.toOutputChannelEntity(any())).thenReturn(output);
    when(outputChannelRepository.save(output)).thenReturn(output);
    OutputChannelDto outputChannelDTO = outputChannelDao.saveOutputChannel(outputDto);
    assertEquals(outputDto, outputChannelDTO);
  }

  @Test
  void testGetOutputChannelById() {
    when(outputChannelRepository.findByEncoderDeviceUserAndId(user, ChannelFixture.CHANNEL_ID))
        .thenReturn(output);
    when(outputChannelMapper.toOutputChannelDto(output)).thenReturn(outputDto);
    OutputChannelDto outputChannelDTO =
        outputChannelDao.getOutputChannelById(user, ChannelFixture.CHANNEL_ID);
    assertEquals(outputDto, outputChannelDTO);
  }

  @Test
  void deleteOutputChannelById() {
    when(outputChannelRepository.deleteByEncoderDeviceUserAndId(user, ChannelFixture.CHANNEL_ID))
        .thenReturn(1L);
    Long response = outputChannelDao.deleteOutputChannelById(user, ChannelFixture.CHANNEL_ID);
    assertEquals(1L, response);
  }
}
