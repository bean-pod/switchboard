package org.beanpod.switchboard.entity;

import lombok.*;

import javax.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LogEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private OffsetDateTime dateTime;

  private String message;

  private String level;

  private String
      serialNumber; // This can be a single serialNumber or two serialNumbers seperated by a comma
}
