package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.Set;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="Channel")
@JsonIgnoreProperties({"hibernateLazyIntializer", "handler", "out", "in"})
public class ChannelEntity {

    @Id
    Integer port;
    String name;

    @ManyToMany(mappedBy = "outputs")
    Set<EncoderEntity> out;

    @ManyToMany(mappedBy = "inputs")
    Set<DecoderEntity> in;

}
