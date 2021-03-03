package org.beanpod.switchboard.entity;

import java.time.OffsetDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
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
public class StreamLog {

  @Id
  @Column(name = "log_id")
  private Long id;

  //second device
  @NotNull
  private String serialNumber;

  @NotNull
  private String streamId;

  @OneToOne
  @MapsId
  @JoinColumn(name="log_id")
  private LogEntity logEntity;
}
