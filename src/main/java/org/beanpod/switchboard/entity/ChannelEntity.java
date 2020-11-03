package org.beanpod.switchboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="Channel")
@JsonIgnoreProperties({"hibernateLazyIntializer", "handler", "out", "in"})
public class ChannelEntity {
    @Id
    String name;
    Integer port;
}
