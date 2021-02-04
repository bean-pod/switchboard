package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.beanpod.switchboard.repository.EncoderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class EncoderDaoImplTest {

  // stubbed DeviceEntity object
  private static EncoderEntity encoder;
  private static EncoderDto encoderDto;
  private static List<EncoderEntity> listOfEncoders;
  @InjectMocks
  private EncoderDaoImpl encoderDaoImpl;
  @Mock
  private EncoderRepository encoderRepository;
  @Mock
  private EncoderMapper encoderMapper;

  @BeforeEach
  void setupEncoderFixture() throws ParseException {
    encoder = EncoderFixture.getEncoderEntity1();
    encoderDto = EncoderFixture.getEncoderDto();
    listOfEncoders = EncoderFixture.getListOfEncoder();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  final void testSave() {
    when(encoderMapper.toEncoderDto(any())).thenReturn(encoderDto);
    when(encoderMapper.toEncoderEntity(any())).thenReturn(encoder);
    when(encoderRepository.save(encoder)).thenReturn(encoder);
    EncoderDto encoderDTO = encoderDaoImpl.save(encoderDto);
    assertEquals(encoderDTO, encoderDto);
  }

  @Test
  final void testFindEncoder() {
    when(encoderMapper.toEncoderDto(any())).thenReturn(encoderDto);
    when(encoderMapper.toEncoderEntity(any())).thenReturn(encoder);
    when(encoderRepository.findEncoderBySerialNumber(EncoderFixture.SERIAL_NUMBER))
        .thenReturn(java.util.Optional.of(encoder));
    Optional<EncoderDto> encoderDTO = encoderDaoImpl.findEncoder(EncoderFixture.SERIAL_NUMBER);
    assertEquals(encoderDTO.get(), encoderDto);
  }

  @Test
  final void testGetEncoders() {
    when(encoderRepository.findAll()).thenReturn(listOfEncoders);
    List<EncoderEntity> deviceEntities = encoderDaoImpl.getEncoders();
    assertIterableEquals(deviceEntities, listOfEncoders);
  }

  @Test
  final void testDeleteEncoder() {
    when(encoderRepository.deleteEncoderEntityBySerialNumber(EncoderFixture.SERIAL_NUMBER))
        .thenReturn((long) 1);
    Long response = encoderDaoImpl.deleteEncoder(EncoderFixture.SERIAL_NUMBER);
    assertEquals(1, response);
  }
}
