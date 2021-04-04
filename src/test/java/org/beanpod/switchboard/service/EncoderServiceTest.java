package org.beanpod.switchboard.service;

import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.nio.file.attribute.UserPrincipal;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.util.DateUtil;
import org.beanpod.switchboard.util.UserMockUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class EncoderServiceTest {

  public static UserEntity user;
  @InjectMocks private EncoderServiceImpl encoderService;
  @Mock private StreamDaoImpl streamDao;
  @Mock private EncoderDaoImpl encoderDao;
  @Mock private DateUtil dateUtil;
  @Mock HttpServletRequest httpServletRequest;
  @Mock UserPrincipal userPrincipal;
  @Mock UserDaoImpl userDao;

  @BeforeEach
  void setup() {
    user = UserFixture.getUserEntity();

    MockitoAnnotations.initMocks(this);

    UserMockUtil.mockUser(user, httpServletRequest, userPrincipal, userDao);
  }

  @Test
  final void testGetEncoderStreams() {
    Date testDate = Date.from(Instant.ofEpochMilli(123513051350L));
    EncoderDto expectedUpdatedEncoder = EncoderFixture.getEncoderDto();
    expectedUpdatedEncoder.setLastCommunication(testDate);

    when(encoderDao.findEncoder(eq(user), any(String.class)))
        .thenReturn(Optional.of(EncoderFixture.getEncoderDto()));
    when(dateUtil.getCurrentDate()).thenReturn(testDate);
    when(encoderDao.save(eq(user), any(EncoderDto.class))).thenReturn(null);
    when(streamDao.getEncoderStreams(eq(user), any(String.class)))
        .thenReturn(List.of(StreamFixture.getStreamDto()));

    List<StreamDto> response = encoderService.getEncoderStreams(user, EncoderFixture.SERIAL_NUMBER);

    verify(encoderDao).findEncoder(user, EncoderFixture.SERIAL_NUMBER);
    verify(dateUtil).getCurrentDate();
    verify(encoderDao).save(user, expectedUpdatedEncoder);
    verify(streamDao).getEncoderStreams(user, EncoderFixture.SERIAL_NUMBER);

    assertIterableEquals(List.of(StreamFixture.getStreamDto()), response);
  }

  @Test
  final void testGetEncoderStreams_deviceNotFound() {
    when(encoderDao.findEncoder(eq(user), any(String.class))).thenReturn(Optional.empty());

    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> encoderService.getEncoderStreams(user, EncoderFixture.SERIAL_NUMBER));

    verify(encoderDao).findEncoder(user, EncoderFixture.SERIAL_NUMBER);
  }
}
