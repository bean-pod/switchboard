package org.beanpod.switchboard.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
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
public class EncoderDTO {
    private String serialNumber;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date lastCommunication;

    private DeviceEntity device;
    private Set<ChannelEntity> outputs;

}
