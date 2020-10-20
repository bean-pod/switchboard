package com.switchboard.app.dto.mapper;

import com.switchboard.app.dto.DecoderDTO;
import com.switchboard.app.entity.DecoderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DecoderMapper {

    DecoderMapper INSTANCE = Mappers.getMapper(DecoderMapper.class);

    DecoderDTO toDecoderDTO(DecoderEntity decoderEntity);

    List<DecoderDTO> toDecoderDTOs(List<DecoderEntity> decoderEntities);

    DecoderEntity toDecoderEntity(DecoderDTO DecoderDTO);
}
