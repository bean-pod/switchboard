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
import org.beanpod.switchboard.dao.DecoderDaoImpl;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.util.DateUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class DecoderServiceTest {

  @InjectMocks
  private DecoderServiceImpl decoderService;
  @Mock
  private StreamDaoImpl streamDao;
  @Mock
  private DecoderDaoImpl decoderDao;
  @Mock
  private DateUtil dateUtil;

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  final void testGetDecoderStreams() {
    Date testDate = Date.from(Instant.ofEpochMilli(123513051350L));
    DecoderDto expectedUpdatedDecoder = DecoderFixture.getDecoderDto();
    expectedUpdatedDecoder.setLastCommunication(testDate);

    when(decoderDao.findDecoder(any(String.class)))
        .thenReturn(Optional.of(DecoderFixture.getDecoderDto()));
    when(dateUtil.getCurrentDate()).thenReturn(testDate);
    when(decoderDao.save(any(DecoderDto.class))).thenReturn(null);
    when(streamDao.getDecoderStreams(any(String.class)))
        .thenReturn(List.of(StreamFixture.getStreamDto()));

    List<StreamDto> response = decoderService.getDecoderStreams(DecoderFixture.SERIAL_NUMBER);

    verify(decoderDao).findDecoder(DecoderFixture.SERIAL_NUMBER);
    verify(dateUtil).getCurrentDate();
    verify(decoderDao).save(expectedUpdatedDecoder);
    verify(streamDao).getDecoderStreams(DecoderFixture.SERIAL_NUMBER);

    assertIterableEquals(List.of(StreamFixture.getStreamDto()), response);
  }

  @Test
  final void testGetDecoderStreams_encoderNotFound() {
    when(decoderDao.findDecoder(any(String.class))).thenReturn(Optional.empty());

    assertThrows(
        ExceptionType.DeviceNotFoundException.class,
        () -> {
          decoderService.getDecoderStreams(DecoderFixture.SERIAL_NUMBER);
        });

    verify(decoderDao).findDecoder(DecoderFixture.SERIAL_NUMBER);
  }
}
