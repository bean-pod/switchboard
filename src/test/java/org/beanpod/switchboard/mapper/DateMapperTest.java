package org.beanpod.switchboard.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.spy;
import static org.mockito.MockitoAnnotations.initMocks;

import java.time.OffsetDateTime;
import java.util.Date;
import lombok.SneakyThrows;
import org.beanpod.switchboard.dto.mapper.DateMapper;
import org.beanpod.switchboard.fixture.DateFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class DateMapperTest {
  private DateMapper dateMapper;

  @BeforeEach
  public void setup() {
    initMocks(this);
    dateMapper = spy(DateMapper.class);
  }

  @SneakyThrows
  @Test
  void testConvertOffsetDatetimeToDate() {
    OffsetDateTime offsetDateTime = DateFixture.getOffsetDateTime();

    Date result = dateMapper.toDate(offsetDateTime);

    Date expectedDate = DateFixture.getDate();
    assertEquals(expectedDate, result);
  }

  @Test
  void testConvertNullDateToOffsetDatetime() {
    OffsetDateTime date = null;

    Date result = dateMapper.toDate(date);

    assertNull(result);
  }

  @SneakyThrows
  @Test
  void testConvertDateToOffsetDatetime() {
    Date date = DateFixture.getDate();

    OffsetDateTime result = dateMapper.toOffsetDateTime(date);

    OffsetDateTime expectedDateTime = DateFixture.getOffsetDateTime();
    assertEquals(expectedDateTime, result);
  }
}
