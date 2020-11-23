package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.DecoderDTO;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {DeviceMapper.class, InputChannelMapper.class})
public interface DecoderMapper {
    DecoderDTO toDecoderDTO(DecoderEntity decoderEntity);
    List<DecoderDTO> toDecoderDTOs(List<DecoderEntity> decoderEntities);
    DecoderEntity toDecoderEntity(DecoderDTO decoderDTO);
}
