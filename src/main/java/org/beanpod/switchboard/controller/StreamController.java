package org.beanpod.switchboard.controller;


import lombok.RequiredArgsConstructor;

import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.openapitools.api.StreamApi;

import org.openapitools.model.CreateStreamRequest;
import org.openapitools.model.StreamModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class StreamController implements StreamApi {
    public static  final String UNKNOWN_ERROR_MESSAGE = "Unknown error in Stream Controller";
    private final StreamDaoImpl streamService;
    private final StreamMapper mapper;

    @Override
    public ResponseEntity<List<Long>> getStreams() {
        return Optional.ofNullable(streamService.getStreams())
                .map(ResponseEntity::ok)
                .orElseThrow(this::getUnknownException);
    }

    @Override
    public ResponseEntity<StreamModel> getStreamById(Long id) {
        return Optional.of(id)
                .map(streamService::getStreamById)
                .map(mapper::toModel)
                .map(ResponseEntity::ok)
                .orElseThrow(this::getUnknownException);
    }

    @Override
    public ResponseEntity<Void> createStream(@Valid CreateStreamRequest createStreamRequest) {
        Optional.of(createStreamRequest)
                .ifPresentOrElse(streamService::createStream, this::getUnknownException);

        return ResponseEntity.ok().build();
    }


    @Override
    public ResponseEntity<Void> deleteStream(Long id) {
        Optional.of(id)
                .ifPresentOrElse(streamService::deleteStream, this::getUnknownException);

        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Void> updateStream(@Valid StreamModel streamModel) {
        Optional.of(streamModel)
                .map(mapper::toDto)
                .ifPresentOrElse(streamService::updateStream, this::getUnknownException);

        return ResponseEntity.ok().build();
    }

    private RuntimeException getUnknownException(){
        return new RuntimeException(UNKNOWN_ERROR_MESSAGE);
    }
}
