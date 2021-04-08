package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.nio.file.attribute.UserPrincipal;
import javax.servlet.http.HttpServletRequest;
import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.dto.mapper.InputChannelMapper;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.ChannelFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.repository.InputChannelRepository;
import org.beanpod.switchboard.util.UserMockUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class InputChannelDaoImplTest {

  private static InputChannelEntity input;
  private static InputChannelDto inputDto;
  private static UserEntity user;
  @InjectMocks private InputChannelDaoImpl inputChannelDao;
  @Mock private InputChannelRepository inputChannelRepository;
  @Mock private InputChannelMapper inputChannelMapper;
  @Mock private HttpServletRequest httpServletRequest;
  @Mock private UserPrincipal userPrincipal;
  @Mock private UserDaoImpl userDao;

  @BeforeEach
  public void setup() {
    setupInputChannelFixture();

    MockitoAnnotations.initMocks(this);

    UserMockUtil.mockUser(user, httpServletRequest, userPrincipal, userDao);
  }

  private void setupInputChannelFixture() {
    input = ChannelFixture.getInputChannelEntity();
    inputDto = ChannelFixture.getInputChannelDto();
    user = UserFixture.getUserEntity();
  }

  @Test
  void testSaveInputChannel() {
    when(inputChannelMapper.toInputChannelDto(any())).thenReturn(inputDto);
    when(inputChannelMapper.toInputChannelEntity(any())).thenReturn(input);
    when(inputChannelRepository.save(input)).thenReturn(input);
    InputChannelDto inputChannelDTO = inputChannelDao.saveInputChannel(inputDto);
    assertEquals(inputDto, inputChannelDTO);
  }

  @Test
  void testGetInputChannelById() {
    when(inputChannelRepository.getOne(ChannelFixture.CHANNEL_ID)).thenReturn(input);
    when(inputChannelMapper.toInputChannelDto(input)).thenReturn(inputDto);
    InputChannelDto inputChannelDTO =
        inputChannelDao.getInputChannelById(ChannelFixture.CHANNEL_ID);
    assertEquals(inputDto, inputChannelDTO);
  }

  @Test
  void deleteInputChannelById() {
    when(inputChannelRepository.deleteInputChannelEntityByDecoderDeviceUserAndId(
            user, ChannelFixture.CHANNEL_ID))
        .thenReturn(1L);
    Long response = inputChannelDao.deleteInputChannelById(user, ChannelFixture.CHANNEL_ID);
    assertEquals(1L, response);
  }
}
