package org.beanpod.switchboard.dao;

import org.beanpod.switchboard.dto.DecoderDTO;
import org.beanpod.switchboard.dto.mapper.DecoderMapper;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.repository.DecoderRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class DecoderDaoImplTest {

    @InjectMocks
    private DecoderDaoImpl decoderDaoImpl;

    @Mock
    private DecoderRepository decoderRepository;

    @Mock
    private DecoderMapper decoderMapper;

    //stubbed DeviceEntity object
    static private DecoderEntity decoder;
    static private DecoderDTO decoderDto;
    static private List<DecoderEntity> listOfdecoders;

    @BeforeAll
    static void decoderFixture() throws ParseException {
        decoderDto = DecoderFixture.getDecoderDto();
        decoder = DecoderFixture.getDecoderEntity1();
        listOfdecoders = DecoderFixture.getListOfDecoders();
    }

    @BeforeEach
    void setup(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    final void testSave() {
        when(decoderMapper.toDecoderDTO(any())).thenReturn(decoderDto);
        when(decoderMapper.toDecoderEntity(any())).thenReturn(decoder);
        when(decoderRepository.save(decoder)).thenReturn(decoder);
        DecoderDTO decoderDTO = decoderDaoImpl.save(decoderDto);
        assertEquals(decoderDTO, decoderDto);
    }

    @Test
    final void testFindDecoder() {
        when(decoderMapper.toDecoderDTO(any())).thenReturn(decoderDto);
        when(decoderMapper.toDecoderEntity(any())).thenReturn(decoder);
        when(decoderRepository.findDecoderBySerialNumber("1")).thenReturn(java.util.Optional.of(decoder));
        Optional<DecoderDTO> decoderDTO = decoderDaoImpl.findDecoder("1");
        assertEquals(decoderDto, decoderDTO.get());
    }

    @Test
    final void testGetDecoders(){
        when(decoderRepository.findAll()).thenReturn(listOfdecoders);
        List<DecoderEntity> deviceEntities = decoderDaoImpl.getDecoders();
        assertIterableEquals(deviceEntities, listOfdecoders);
    }

    @Test
    final void testDeleteDecoder(){
        when(decoderRepository.deleteDecoderEntityBySerialNumber("1")).thenReturn((long) 1);
        Long response = decoderDaoImpl.deleteDecoder("1");
        assertEquals(response, (long) 1d);
    }

}
