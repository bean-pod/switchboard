package org.beanpod.switchboard.dao;

import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.DeviceFixture;
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
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.Mockito.when;

class DecoderDaoImplTest {

    @InjectMocks
    private DecoderDaoImpl decoderDaoImpl;

    @Mock
    private DecoderRepository decoderRepository;

    //stubbed DeviceEntity object
    static private DeviceEntity device1, device2;
    static private DecoderEntity decoder1, decoder2;
    static private Set<ChannelEntity> setOfChannels;
    static private List<DecoderEntity> listOfdecoders;

    @BeforeAll
    static void decoderFixture() throws ParseException {
        device1 = DeviceFixture.getDevice1();
        device2 = DeviceFixture.getDevice2();

        decoder1 = DecoderFixture.getDecoder1(device1);
        decoder2 = DecoderFixture.getDecoder2(device2);
        listOfdecoders = DecoderFixture.getListOfDecoders(decoder1, decoder2);
    }

    @BeforeEach
    void setup(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    final void testSave(){
        when(decoderRepository.save(decoder1)).thenReturn(decoder1);
        DecoderEntity decoderEntity = decoderDaoImpl.save(decoder1);
        assertEquals(decoderEntity,decoder1,"Returned decoder is not equal mocked");
    }

    @Test
    final void testFindDecoder(){
        when(decoderRepository.findDecoderBySerialNumber("1")).thenReturn(java.util.Optional.of(decoder1));
        Optional<DecoderEntity> decoderEntity = decoderDaoImpl.findDecoder("1");
        assertEquals(decoderEntity,java.util.Optional.of(decoder1),"Returned decoder equal mocked");
    }

    @Test
    final void testGetDecoders(){
        when(decoderRepository.findAll()).thenReturn(listOfdecoders);
        List<DecoderEntity> deviceEntities = decoderDaoImpl.getDecoders();
        assertIterableEquals(deviceEntities, listOfdecoders, "list of expected and given decoders are not equal");
    }

    @Test
    final void testDeleteDecoder(){
        when(decoderRepository.deleteDecoderEntityBySerialNumber("1")).thenReturn((long) 1);
        Long response = decoderDaoImpl.deleteDecoder("1");
        assertEquals(response, (long)1, "Deleting decoder should return 1");
    }

}
