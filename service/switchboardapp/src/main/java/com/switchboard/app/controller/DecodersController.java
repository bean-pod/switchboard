package com.switchboard.app.controller;

import org.openapitools.api.DecodersApi;
import org.openapitools.model.CreateDecoderRequest;
import org.openapitools.model.Decoder;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;
import java.util.List;

public class DecodersController implements DecodersApi {
    @Override
    public ResponseEntity<List<String>> getDecoders() {
        return null;
    }

    @Override
    public ResponseEntity<Void> createDecoder(@Valid CreateDecoderRequest createDecoderRequest) {
        return null;
    }

    @Override
    public ResponseEntity<Decoder> getDecoderById(String uuid) {
        return null;
    }

    @Override
    public ResponseEntity<Void> updateDecoder(String uuid, @Valid Decoder decoder) {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteDecoder(String uuid) {
        return null;
    }
}
