package org.beanpod.switchboard.mapper;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.spy;

import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.fixture.LogFixture;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class LogMapperTest {

  private static LogMapper logMapper;
  private static OffsetDateTime dateTime;

  @BeforeEach
  void setup() {
    logMapper = spy(LogMapper.class);
    dateTime = LogFixture.dateTime;
  }

  @Test
  void mapTestValidDateString() {
    String validDateTime = "2017-05-12T05:45+00:00";
    OffsetDateTime offsetDateTime = logMapper.map(validDateTime);

    assertEquals(dateTime, offsetDateTime);
  }

  @Test
  void mapTestInvalidDateString() {
    String validDateTime = "2017-05-12 05:45+00:00";

    try {
      OffsetDateTime offsetDateTime = logMapper.map(validDateTime);
      Assertions.fail("Expected exception to be thrown");
    } catch (DateTimeParseException e) {
      assertThat(e)
          .isInstanceOf(DateTimeParseException.class)
          .hasMessage("Text '2017-05-12 05:45+00:00' could not be parsed at index 10");
    }
  }
}
