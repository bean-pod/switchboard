package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.StreamStatDto;
import org.beanpod.switchboard.entity.StreamStatEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.openapitools.model.StreamStatModel;
import org.openapitools.model.StreamStatModel2;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface StreamStatMapper {

  @Mapping(source = "window.flow", target = "flow")
  @Mapping(source = "window.congestion", target = "congestion")
  @Mapping(source = "window.flight", target = "flight")
  @Mapping(source = "link.rtt", target = "rtt")
  @Mapping(source = "link.bandwidth", target = "bandwidth")
  @Mapping(source = "link.maxBandwidth", target = "maxBandwidth")
  @Mapping(source = "send.packets", target = "sendPackets")
  @Mapping(source = "send.packetsLost", target = "sendPacketsLost")
  @Mapping(source = "send.packetsDropped", target = "sendPacketsDropped")
  @Mapping(source = "send.packetsRetransmitted", target = "sendPacketsRetransmitted")
  @Mapping(source = "send.bytes", target = "sendBytes")
  @Mapping(source = "send.bytesDropped", target = "sendBytesDropped")
  @Mapping(source = "send.mbitRate", target = "sendMbitRate")
  @Mapping(source = "recv.packets", target = "recvPackets")
  @Mapping(source = "recv.packetsLost", target = "recvPacketsLost")
  @Mapping(source = "recv.packetsDropped", target = "recvPacketsDropped")
  @Mapping(source = "recv.packetsRetransmitted", target = "recvPacketsRetransmitted")
  @Mapping(source = "recv.packetsBelated", target = "recvPacketsBelated")
  @Mapping(source = "recv.bytes", target = "recvBytes")
  @Mapping(source = "recv.bytesLost", target = "recvBytesLost")
  @Mapping(source = "recv.bytesDropped", target = "recvBytesDropped")
  @Mapping(source = "recv.mbitRate", target = "recvMbitRate")
  StreamStatDto toDto(StreamStatModel2 streamModel);

  StreamStatDto toDto(StreamStatEntity streamStatEntity);

  List<StreamStatDto> toDtoList(List<StreamStatEntity> streamStatEntityList);

  StreamStatEntity toEntity(StreamStatDto streamStatDto);

  @Mapping(target = "window.flow", source = "flow")
  @Mapping(target = "window.congestion", source = "congestion")
  @Mapping(target = "window.flight", source = "flight")
  @Mapping(target = "link.rtt", source = "rtt")
  @Mapping(target = "link.bandwidth", source = "bandwidth")
  @Mapping(target = "link.maxBandwidth", source = "maxBandwidth")
  @Mapping(target = "send.packets", source = "sendPackets")
  @Mapping(target = "send.packetsLost", source = "sendPacketsLost")
  @Mapping(target = "send.packetsDropped", source = "sendPacketsDropped")
  @Mapping(target = "send.packetsRetransmitted", source = "sendPacketsRetransmitted")
  @Mapping(target = "send.bytes", source = "sendBytes")
  @Mapping(target = "send.bytesDropped", source = "sendBytesDropped")
  @Mapping(target = "send.mbitRate", source = "sendMbitRate")
  @Mapping(target = "recv.packets", source = "recvPackets")
  @Mapping(target = "recv.packetsLost", source = "recvPacketsLost")
  @Mapping(target = "recv.packetsDropped", source = "recvPacketsDropped")
  @Mapping(target = "recv.packetsRetransmitted", source = "recvPacketsRetransmitted")
  @Mapping(target = "recv.packetsBelated", source = "recvPacketsBelated")
  @Mapping(target = "recv.bytes", source = "recvBytes")
  @Mapping(target = "recv.bytesLost", source = "recvBytesLost")
  @Mapping(target = "recv.bytesDropped", source = "recvBytesDropped")
  @Mapping(target = "recv.mbitRate", source = "recvMbitRate")
  StreamStatModel2 toModel(StreamStatDto streamStatDto);

  List<StreamStatModel> toModelList(List<StreamStatDto> streamDtoList);

  void updateStreamStatFromDto(StreamStatDto dto, @MappingTarget StreamStatDto target);
}
