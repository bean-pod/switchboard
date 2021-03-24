package org.beanpod.switchboard.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.fixture.LogFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class LogDtoTest {
  public static LogDto logDto;

  @BeforeEach
  void setup() {
    logDto = LogFixture.getLogDtoCustomConstructor();
  }

  @Test
  final void customLogDtoTest() {
    LogDto actualLogDto =
        new LogDto(
            LogFixture.id,
            LogFixture.dateTime,
            LogFixture.message,
            LogFixture.level,
            DeviceFixture.SERIAL_NUMBER);

    assertEquals(logDto, actualLogDto);
    assertNull(actualLogDto.getStreamLog());
  }
}
