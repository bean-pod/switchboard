package org.beanpod.switchboard.controller;

import org.openapitools.api.StreamsApi;
import org.openapitools.model.StreamModel;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;
import java.util.List;

public class StreamController implements StreamsApi {

    @Override
    public ResponseEntity<List<String>> getStreams() {
        return null;
    }

    @Override
    public ResponseEntity<StreamModel> getStreamById(String uuid) {
        return null;
    }

    @Override
    public ResponseEntity<Void> createStream(@Valid StreamModel streamModel) {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteStream(String uuid) {
        return null;
    }

    @Override
    public ResponseEntity<Void> updateStream(String uuid, @Valid StreamModel streamModel) {
        return null;
    }
}
