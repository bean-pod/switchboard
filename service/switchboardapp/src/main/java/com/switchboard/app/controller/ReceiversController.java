package com.switchboard.app.controller;

import org.openapitools.api.ReceiversApi;
import org.openapitools.model.Receiver;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;
import java.util.List;

public class ReceiversController implements ReceiversApi {
    @Override
    public ResponseEntity<List<String>> getReceivers() {
        return null;
    }

    @Override
    public ResponseEntity<Void> createReceiver(@Valid Receiver receiver) {
        return null;
    }

    @Override
    public ResponseEntity<Receiver> getReceiverById(String uuid) {
        return null;
    }

    @Override
    public ResponseEntity<Void> updateReceiver(String uuid, @Valid Receiver receiver) {
        return null;
    }

    @Override
    public ResponseEntity<Void> deleteReceiver(String uuid) {
        return null;
    }
}
