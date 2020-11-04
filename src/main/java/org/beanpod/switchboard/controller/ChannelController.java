package org.beanpod.switchboard.controller;


import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.ChannelDaoImpl;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
import org.openapitools.api.ChannelApi;
import org.openapitools.model.ChannelModel;
import org.openapitools.model.CreateChannelRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class ChannelController implements ChannelApi {
    public static  final String UNKNOWN_ERROR_MESSAGE = "Unknown error in ChannelController";
    private final ChannelDaoImpl channelService;
    private final ChannelMapper mapper;

    @Override
    public ResponseEntity<List<Long>> getChannels() {
        return Optional.ofNullable(channelService.getChannels())
                .map(ResponseEntity::ok)
                .orElseThrow(this::getUnknownException);
    }

    @Override
    public ResponseEntity<ChannelModel> getChannelById(Long id) {
        return Optional.of(id)
                .map(channelService::getChannelById)
                .map(mapper::toModel)
                .map(ResponseEntity::ok)
                .orElseThrow(this::getUnknownException);
    }

    @Override
    public ResponseEntity<Void> createChannel(@Valid CreateChannelRequest createChannelRequest) {
        Optional.of(createChannelRequest)
                .ifPresentOrElse(channelService::createChannel, this::getUnknownException);

        return ResponseEntity.ok().build();
    }


    @Override
    public ResponseEntity<Void> deleteChannel(Long id) {
        Optional.of(id)
                .ifPresentOrElse(channelService::deleteChannel, this::getUnknownException);

        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Void> updateChannel(@Valid ChannelModel channelModel) {
        Optional.of(channelModel)
                .map(mapper::toDto)
                .ifPresentOrElse(channelService::updateChannel, this::getUnknownException);

        return ResponseEntity.ok().build();
    }

    private RuntimeException getUnknownException(){
        return new RuntimeException(UNKNOWN_ERROR_MESSAGE);
    }
}
