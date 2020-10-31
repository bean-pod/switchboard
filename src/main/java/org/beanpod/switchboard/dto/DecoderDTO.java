package org.beanpod.switchboard.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.entity.DeviceEntity;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DecoderDTO {
    private String serialNumber;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date lastCommunication;

    private DeviceDTO device;
    private Set<ChannelEntity> inputs;
}
