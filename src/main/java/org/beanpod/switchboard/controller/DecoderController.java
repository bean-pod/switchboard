package org.beanpod.switchboard.controller;

import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.DecoderDaoImpl;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dto.DecoderDTO;
import org.beanpod.switchboard.dto.DeviceDTO;
import org.beanpod.switchboard.dto.mapper.DecoderMapper;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/decoder")
@RequiredArgsConstructor
public class DecoderController {

  private final DecoderDaoImpl decoderService;
  private final DeviceDaoImpl deviceService;
  private final DecoderMapper decoderMapper;

  @GetMapping
  public List<DecoderDTO> retrieveAllDecoders() {
    List<DecoderEntity> decoderEntity = decoderService.getDecoders();
    return decoderMapper.toDecoderDTOs(decoderEntity);
  }

  @GetMapping("/{serialNumber}")
  public ResponseEntity<DecoderDTO> retrieveDecoder(@PathVariable @Valid String serialNumber) {
    return decoderService
        .findDecoder(serialNumber)
        .map(ResponseEntity::ok)
        .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(serialNumber));
  }

  @PostMapping
  public ResponseEntity<DecoderDTO> createDecoder(@RequestBody @Valid DecoderDTO decoderDTO) {
    Optional<DeviceDTO> deviceOptional = deviceService.findDevice(decoderDTO.getSerialNumber());
    if (deviceOptional.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(decoderDTO.getSerialNumber());
    }
    decoderDTO.setDevice(deviceOptional.get());
    return ResponseEntity.ok(decoderService.save(decoderDTO));
  }

  @DeleteMapping("/{serialNumber}")
  @Transactional
  public ResponseEntity<String> deleteDecoder(@PathVariable String serialNumber) {
    Long response = decoderService.deleteDecoder(serialNumber);
    if (response != 1) {
      throw new ExceptionType.DeviceNotFoundException(serialNumber);
    }
    return ResponseEntity.ok("Decoder with serial number " + serialNumber + " Deleted");
  }

  @PutMapping
  public ResponseEntity<DecoderDTO> updateDecoder(@RequestBody DecoderDTO decoderDTO) {
    Optional<DecoderDTO> decoder = decoderService.findDecoder(decoderDTO.getSerialNumber());
    if (decoder.isEmpty()) {
      throw new ExceptionType.DeviceNotFoundException(decoderDTO.getSerialNumber());
    }
    return ResponseEntity.ok(decoderService.save(decoderDTO));
  }
}
