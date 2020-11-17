package org.beanpod.switchboard.dao;

import org.beanpod.switchboard.dto.EncoderDTO;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.beanpod.switchboard.repository.EncoderRepository;
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

class EncoderDaoImplTest {

    @InjectMocks
    private EncoderDaoImpl encoderDaoImpl;

    @Mock
    private EncoderRepository encoderRepository;

    @Mock
    private EncoderMapper encoderMapper;

    //stubbed DeviceEntity object
    static private EncoderEntity encoder;
    static private EncoderDTO encoderDto;
    static private List<EncoderEntity> listOfEncoders;

    @BeforeAll
    static void encoderFixture() throws ParseException {
        encoder = EncoderFixture.getEncoderEntity1();
        encoderDto = EncoderFixture.getEncoderDto();
        listOfEncoders = EncoderFixture.getListOfEncoder();
    }

    @BeforeEach
    void setup(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    final void testSave() {
        when(encoderMapper.toEncoderDTO(any())).thenReturn(encoderDto);
        when(encoderMapper.toEncoderEntity(any())).thenReturn(encoder);
        when(encoderRepository.save(encoder)).thenReturn(encoder);
        EncoderDTO encoderDTO = encoderDaoImpl.save(encoderDto);
        assertEquals(encoderDTO, encoderDto);
    }

    @Test
    final void testFindEncoder() {
        when(encoderMapper.toEncoderDTO(any())).thenReturn(encoderDto);
        when(encoderMapper.toEncoderEntity(any())).thenReturn(encoder);
        when(encoderRepository.findEncoderBySerialNumber("1")).thenReturn(java.util.Optional.of(encoder));
        Optional<EncoderDTO> encoderDTO = encoderDaoImpl.findEncoder("1");
        assertEquals(encoderDTO.get(), encoderDto);
    }

    @Test
    final void testGetEncoders(){
        when(encoderRepository.findAll()).thenReturn(listOfEncoders);
        List<EncoderEntity> deviceEntities = encoderDaoImpl.getEncoders();
        assertIterableEquals(deviceEntities, listOfEncoders);
    }

    @Test
    final void testDeleteEncoder(){
        when(encoderRepository.deleteEncoderEntityBySerialNumber("1")).thenReturn((long)1);
        Long response = encoderDaoImpl.deleteEncoder("1");
        assertEquals(response, (long) 1);
    }

}
