package com.switchboard.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.Set;

@Data
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
