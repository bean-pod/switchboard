package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.EncoderDTO;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EncoderMapper {

    EncoderMapper INSTANCE = Mappers.getMapper(EncoderMapper.class);

    EncoderDTO toEncoderDTO(EncoderEntity encoderEntity);

    List<EncoderDTO> toEncoderDTOs(List<EncoderEntity> encoderEntities);

    EncoderEntity toEncoderEntity(EncoderDTO encoderDTO);

}
