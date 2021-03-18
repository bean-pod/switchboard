package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.mapper.DecoderMapper;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.repository.DecoderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

class DecoderDaoImplTest {

  // stubbed DeviceEntity object
  private static DecoderEntity decoder;
  private static DecoderDto decoderDto;
  private static List<DecoderEntity> listOfdecoders;
  @InjectMocks private DecoderDaoImpl decoderDaoImpl;
  @Mock private DecoderRepository decoderRepository;
  @Mock private DecoderMapper decoderMapper;

  @BeforeEach
  void setupDecoderFixture() throws ParseException {
    decoderDto = DecoderFixture.getDecoderDto();
    decoder = DecoderFixture.getDecoderEntity1();
    listOfdecoders = DecoderFixture.getListOfDecoders();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  final void testSave() {
    when(decoderMapper.toDecoderDto(any())).thenReturn(decoderDto);
    when(decoderMapper.toDecoderEntity(any())).thenReturn(decoder);
    when(decoderRepository.save(decoder)).thenReturn(decoder);
    DecoderDto decoderDTO = decoderDaoImpl.save(decoderDto);
    assertEquals(decoderDTO, decoderDto);
  }

  @Test
  final void testSaveIfNotEmpty() {
    DecoderDaoImpl decoderDaoImp = new DecoderDaoImpl(decoderRepository, decoderMapper);
    DecoderDaoImpl decoderDaoImp1 = Mockito.spy(decoderDaoImp);
    Mockito.doReturn(Optional.of(decoderDto)).when(decoderDaoImp1).findDecoder(any());
    when(decoderDaoImp.findDecoder(any())).thenReturn(Optional.of(decoderDto));
    when(decoderMapper.toDecoderDto(any())).thenReturn(decoderDto);
    when(decoderMapper.toDecoderEntity(any())).thenReturn(decoder);
    when(decoderRepository.save(decoder)).thenReturn(decoder);
    DecoderDto decoderDTO = decoderDaoImp1.save(decoderDto);
    assertEquals(decoderDTO, decoderDto);
  }

  @Test
  final void testFindDecoder() {
    when(decoderMapper.toDecoderDto(any())).thenReturn(decoderDto);
    when(decoderMapper.toDecoderEntity(any())).thenReturn(decoder);
    when(decoderRepository.findDecoderBySerialNumber(DecoderFixture.SERIAL_NUMBER))
        .thenReturn(java.util.Optional.of(decoder));
    Optional<DecoderDto> decoderDTO = decoderDaoImpl.findDecoder(DecoderFixture.SERIAL_NUMBER);
    assertEquals(decoderDto, decoderDTO.get());
  }

  @Test
  final void testGetDecoders() {
    when(decoderRepository.findAll()).thenReturn(listOfdecoders);
    List<DecoderEntity> deviceEntities = decoderDaoImpl.getDecoders();
    assertIterableEquals(deviceEntities, listOfdecoders);
  }

  @Test
  final void testDeleteDecoder() {
    when(decoderRepository.deleteDecoderEntityBySerialNumber(DecoderFixture.SERIAL_NUMBER))
        .thenReturn((long) 1);
    Long response = decoderDaoImpl.deleteDecoder(DecoderFixture.SERIAL_NUMBER);
    assertEquals(1L, response);
  }
}
