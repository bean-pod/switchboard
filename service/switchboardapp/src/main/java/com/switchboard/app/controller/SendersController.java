package com.switchboard.app.controller;

import org.openapitools.api.SendersApi;
import org.openapitools.model.CreateSenderRequest;
import org.openapitools.model.Sender;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;
import java.util.List;

public class SendersController implements SendersApi {
    @Override
    public ResponseEntity<List<String>> getSenders() {
        return null;
    }

    @Override
    public ResponseEntity<Void> createSender(@Valid CreateSenderRequest createSenderRequest) {
        return null;
    }

    @Override
    public ResponseEntity<Sender> getSenderById(String uuid) {
        return null;
    }

    @Override
    public ResponseEntity<Void> updateSender(String uuid, @Valid Sender sender) {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteSender(String uuid) {
        return null;
    }
}
