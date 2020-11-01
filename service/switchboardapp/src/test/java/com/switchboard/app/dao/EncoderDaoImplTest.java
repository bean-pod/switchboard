package com.switchboard.app.dao;

import com.switchboard.app.entity.ChannelEntity;
import com.switchboard.app.entity.DeviceEntity;
import com.switchboard.app.entity.EncoderEntity;
import com.switchboard.app.fixture.ChannelFixture;
import com.switchboard.app.fixture.DeviceFixture;
import com.switchboard.app.fixture.EncoderFixture;
import com.switchboard.app.repository.EncoderRepository;
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

class EncoderDaoImplTest {

    @InjectMocks
    private EncoderDaoImpl encoderDaoImpl;

    @Mock
    private EncoderRepository encoderRepository;

    //stubbed DeviceEntity object
    static private DeviceEntity device1, device2;
    static private EncoderEntity encoder1, encoder2;
    static private Set<ChannelEntity> setOfChannels;
    static private List<EncoderEntity> listOfEncoders;

    @BeforeAll
    static void encoderFixture() throws ParseException {
        device1 = DeviceFixture.getDevice1();
        device2 = DeviceFixture.getDevice2();

        setOfChannels = ChannelFixture.getSetOfChannels();

        encoder1 = EncoderFixture.getEncoder1(device1, setOfChannels);
        encoder2 = EncoderFixture.getEncoder2(device2, setOfChannels);
        listOfEncoders = EncoderFixture.getListOfEncoder(encoder1, encoder2);
    }

    @BeforeEach
    void setup(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    final void testSave(){
        when(encoderRepository.save(encoder1)).thenReturn(encoder1);
        EncoderEntity encoderEntity = encoderDaoImpl.save(encoder1);
        assertEquals(encoderEntity,encoder1,"Returned encoder is not equal mocked");
    }

    @Test
    final void testFindEncoder(){
        when(encoderRepository.findEncoderBySerialNumber("1")).thenReturn(java.util.Optional.of(encoder1));
        Optional<EncoderEntity> encoderEntity = encoderDaoImpl.findEncoder("1");
        assertEquals(encoderEntity,java.util.Optional.of(encoder1),"Returned encoder is not equal mocked");
    }

    @Test
    final void testGetEncoders(){
        when(encoderRepository.findAll()).thenReturn(listOfEncoders);
        List<EncoderEntity> deviceEntities = encoderDaoImpl.getEncoders();
        assertIterableEquals(deviceEntities, listOfEncoders, "list of expected and given encoders are not equal");
    }

    @Test
    final void testDeleteEncoder(){
        when(encoderRepository.deleteEncoderEntityBySerialNumber("1")).thenReturn((long)1);
        Long response = encoderDaoImpl.deleteEncoder("1");
        assertEquals(response, (long)1, "Deleting encoder should return 1");
    }

}
