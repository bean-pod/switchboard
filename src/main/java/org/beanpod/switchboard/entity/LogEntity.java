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
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity(name = "Log")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class LogEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NonNull private OffsetDateTime dateTime;

  @NonNull private String message;

  @NonNull private String level;

  // first device
  @NonNull private String serialNumber;

  @OneToOne(mappedBy = "logEntity", cascade = CascadeType.ALL)
  @PrimaryKeyJoinColumn
  private StreamLogEntity streamLogEntity;
}
