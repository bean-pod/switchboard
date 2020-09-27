package com.switchboard.app.controller;

import org.openapitools.api.EncodersApi;
import org.openapitools.model.CreateEncoderRequest;
import org.openapitools.model.Encoder;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;
import java.util.List;

public class EncodersController implements EncodersApi {
    @Override
    public ResponseEntity<List<String>> getEncoders() {
        return null;
    }

    @Override
    public ResponseEntity<Void> createEncoder(@Valid CreateEncoderRequest createEncoderRequest) {
        return null;
    }

    @Override
    public ResponseEntity<Encoder> getEncoderById(String uuid) {
        return null;
    }

    @Override
    public ResponseEntity<Void> updateEncoder(String uuid, @Valid Encoder encoder) {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteEncoder(String uuid) {
        return null;
    }
}
