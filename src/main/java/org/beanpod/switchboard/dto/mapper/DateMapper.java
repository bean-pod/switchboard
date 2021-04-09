package org.beanpod.switchboard.dto.mapper;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DateMapper {
  default Date toDate(OffsetDateTime offsetDateTime) {
    if (offsetDateTime == null) {
      return null;
    }

    return Date.from(offsetDateTime.toInstant());
  }

  default OffsetDateTime toOffsetDateTime(Date date) {
    return date.toInstant().atOffset(ZoneOffset.UTC);
  }
}
