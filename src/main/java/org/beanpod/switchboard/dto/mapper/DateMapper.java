package org.beanpod.switchboard.dto.mapper;

import java.time.OffsetDateTime;
import java.util.Date;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DateMapper {
  default Date toDate(OffsetDateTime offsetDateTime) {
    return new Date(offsetDateTime.toInstant().toEpochMilli());
  }

  default OffsetDateTime toOffsetDateTime(Date date) {
    return OffsetDateTime.from(date.toInstant());
  }
}
