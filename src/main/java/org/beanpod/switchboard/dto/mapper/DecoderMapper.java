package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.DecoderDTO;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", uses = {DeviceMapper.class, InputChannelMapper.class}, injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface DecoderMapper {
    DecoderMapper INSTANCE = Mappers.getMapper(DecoderMapper.class);
    DecoderDTO toDecoderDTO(DecoderEntity decoderEntity);
    List<DecoderDTO> toDecoderDTOs(List<DecoderEntity> decoderEntities);
    DecoderEntity toDecoderEntity(DecoderDTO decoderDTO);
}
