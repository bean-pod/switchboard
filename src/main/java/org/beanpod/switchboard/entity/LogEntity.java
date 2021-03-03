package org.beanpod.switchboard.entity;

import java.time.OffsetDateTime;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LogEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private OffsetDateTime dateTime;

  private String message;

  private String level;

  // first device
  private String serialNumber;

  @OneToOne(mappedBy = "logEntity", cascade = CascadeType.ALL)
  @PrimaryKeyJoinColumn
  private StreamLog streamLog;
}
