package org.beanpod.switchboard.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@EqualsAndHashCode
@Builder
@AllArgsConstructor
public class LogDto {

  private Long id;

  @Temporal(TemporalType.TIMESTAMP)
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private Date dateTime;

  private String message;

  private String level;
}
