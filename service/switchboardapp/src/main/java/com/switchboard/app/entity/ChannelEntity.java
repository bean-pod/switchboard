package com.switchboard.app.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.Set;

@Entity
public class ChannelEntity {

    @Id
    Long port;
    String name;

    @ManyToMany
    Set<EncoderEntity> output;

    @ManyToMany
    Set<DecoderEntity> input;

}
