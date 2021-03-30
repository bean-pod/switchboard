package org.beanpod.switchboard.service;

import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.util.DateUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class EncoderServiceTest {

  @InjectMocks private EncoderServiceImpl encoderService;
  @Mock private StreamDaoImpl streamDao;
  @Mock private EncoderDaoImpl encoderDao;
  @Mock private DateUtil dateUtil;

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  final void testGetEncoderStreams() {
    Date testDate = Date.from(Instant.ofEpochMilli(123513051350L));
    EncoderDto expectedUpdatedEncoder = EncoderFixture.getEncoderDto();
    expectedUpdatedEncoder.setLastCommunication(testDate);

    when(encoderDao.findEncoder(any(String.class)))
        .thenReturn(Optional.of(EncoderFixture.getEncoderDto()));
    when(dateUtil.getCurrentDate()).thenReturn(testDate);
    when(encoderDao.save(any(EncoderDto.class))).thenReturn(null);
    when(streamDao.getEncoderStreams(any(String.class)))
        .thenReturn(List.of(StreamFixture.getStreamDto()));

    List<StreamDto> response = encoderService.getEncoderStreams(EncoderFixture.SERIAL_NUMBER);

    verify(encoderDao).findEncoder(EncoderFixture.SERIAL_NUMBER);
    verify(dateUtil).getCurrentDate();
    verify(encoderDao).save(expectedUpdatedEncoder);
    verify(streamDao).getEncoderStreams(EncoderFixture.SERIAL_NUMBER);

    assertIterableEquals(List.of(StreamFixture.getStreamDto()), response);
  }

  @Test
  final void testGetEncoderStreams_deviceNotFound() {
    when(encoderDao.findEncoder(any(String.class))).thenReturn(Optional.empty());

    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> {
          encoderService.getEncoderStreams(EncoderFixture.SERIAL_NUMBER);
        });

    verify(encoderDao).findEncoder(EncoderFixture.SERIAL_NUMBER);
  }
}
