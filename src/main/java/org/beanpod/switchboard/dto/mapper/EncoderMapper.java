package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.EncoderDTO;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(
    componentModel = "spring",
    uses = {DeviceMapper.class, OutputChannelMapper.class})
public interface EncoderMapper {
  EncoderDTO toEncoderDTO(EncoderEntity encoderEntity);

  @Named("toEncoderDTOShallow")
  @Mapping(target = "output", ignore = true)
  EncoderDTO toEncoderDTOShallow(EncoderEntity encoderEntity);

  List<EncoderDTO> toEncoderDTOs(List<EncoderEntity> encoderEntities);

  EncoderEntity toEncoderEntity(EncoderDTO encoderDTO);
}
