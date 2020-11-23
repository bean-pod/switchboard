package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.DecoderDTO;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.mapstruct.Mapper;

@Mapper(
    componentModel = "spring",
    uses = {DeviceMapper.class, InputChannelMapper.class})
public interface DecoderMapper {
  DecoderDTO toDecoderDTO(DecoderEntity decoderEntity);

  List<DecoderDTO> toDecoderDTOs(List<DecoderEntity> decoderEntities);

  DecoderEntity toDecoderEntity(DecoderDTO decoderDTO);
}
