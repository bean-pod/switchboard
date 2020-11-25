package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.mapstruct.Mapper;

@Mapper(
    componentModel = "spring",
    uses = {DeviceMapper.class, InputChannelMapper.class})
public interface DecoderMapper {
  DecoderDto toDecoderDto(DecoderEntity decoderEntity);

  List<DecoderDto> toDecoderDtos(List<DecoderEntity> decoderEntities);

  DecoderEntity toDecoderEntity(DecoderDto decoderDto);
}
