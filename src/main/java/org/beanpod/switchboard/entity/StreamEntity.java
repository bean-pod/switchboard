package org.beanpod.switchboard.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "Stream")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StreamEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private long id;

  @OneToOne(
      mappedBy = "stream",
      cascade = {CascadeType.ALL})
  @NotNull
  private StreamStatEntity streamStatEntity;

  @OneToOne(optional = false, fetch = FetchType.LAZY)
  @JoinColumn(name = "input_channel_id")
  private InputChannelEntity inputChannel;

  @OneToOne(optional = false, fetch = FetchType.LAZY)
  @JoinColumn(name = "output_channel_id")
  private OutputChannelEntity outputChannel;

  @Column(name = "isRendezvous")
  @NotNull
  private Boolean isRendezvous;

  public interface StreamIdProjection {
    Long getId();
  }
}
