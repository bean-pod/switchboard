package org.beanpod.switchboard.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class StreamLog {

  @Id
  @Column(name = "log_id")
  private Long id;

  // second device
  @NotNull
  @NonNull
  private String serialNumber;

  @NotNull
  @NonNull
  private String streamId;

  @OneToOne
  @MapsId
  @JoinColumn(name = "log_id")
  private LogEntity logEntity;
}
