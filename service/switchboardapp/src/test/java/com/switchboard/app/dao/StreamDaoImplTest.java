package com.switchboard.app.dao;

import com.switchboard.app.dto.DecoderDTO;
import com.switchboard.app.dto.EncoderDTO;
import com.switchboard.app.dto.StreamDTO;
import com.switchboard.app.dto.mapper.DecoderMapper;
import com.switchboard.app.dto.mapper.EncoderMapper;
import com.switchboard.app.entity.DecoderEntity;
import com.switchboard.app.entity.EncoderEntity;
import com.switchboard.app.entity.StreamEntity;
import com.switchboard.app.entity.mapper.StreamMapper;
import com.switchboard.app.fixture.DecoderFixture;
import com.switchboard.app.fixture.DeviceFixture;
import com.switchboard.app.fixture.EncoderFixture;
import com.switchboard.app.fixture.StreamFixture;
import com.switchboard.app.repository.StreamRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.openapitools.model.CreateStreamRequest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class StreamDaoImplTest {
    private StreamDaoImpl streamService;

    @Mock
    private StreamRepository streamRepository;
    @Mock
    private StreamMapper streamMapper;
    @Mock
    private DecoderDaoImpl decoderService;
    @Mock
    private EncoderDaoImpl encoderService;
    @Mock
    private DecoderMapper decoderMapper;
    @Mock
    private EncoderMapper encoderMapper;

    @BeforeEach
    public void setup(){
        initMocks(this);
        streamService = new StreamDaoImpl(streamRepository, streamMapper, decoderService, encoderService, decoderMapper, encoderMapper);
    }

    @Test
    public void testGetStreams(){
        //given
        List<Long> streamIdList = StreamFixture.getIdList();
        when(streamRepository.getAllId()).thenReturn(streamIdList);

        //when
        List<Long> result = streamService.getStreams();

        //then
        assertEquals(result, StreamFixture.getIdList());
    }

    @Test
    public void testGetStreamById(){
        long streamId = StreamFixture.ID;
        String decoderSerialNumber = DecoderFixture.SERIAL_NUMBER;
        String encoderSerialNumber = EncoderFixture.SERIAL_NUMBER;
        StreamEntity streamEntity = StreamFixture.getStreamEntity();
        StreamDTO streamDto = StreamFixture.getStreamDto();

        when(streamRepository.getOne(streamId)).thenReturn(streamEntity);
        when(streamMapper.toDto(streamEntity)).thenReturn(streamDto);

        //when
        StreamDTO result = streamService.getStreamById(streamId);

        //then
        assertEquals(result.getId(), streamId);
        assertEquals(result.getDecoder().getSerialNumber(), decoderSerialNumber);
        assertEquals(result.getEncoder().getSerialNumber(), encoderSerialNumber);
    }

    @Test
    public void testCreateStream(){
        //given
        CreateStreamRequest createStreamRequest = StreamFixture.getCreateStreamRequest();
        String decoderSerialNumber = DecoderFixture.SERIAL_NUMBER;
        String encoderSerialNumber = EncoderFixture.SERIAL_NUMBER;
        Optional<DecoderEntity> decoderEntity = Optional.of(DecoderFixture.getDecoder1(DeviceFixture.getDevice1()));
        Optional<EncoderEntity> encoderEntity = Optional.of(EncoderFixture.getEncoder1(DeviceFixture.getDevice1()));
        DecoderDTO decoderDTO = DecoderFixture.getDecoderDto();
        EncoderDTO encoderDto = EncoderFixture.getEncoderDto();
        StreamEntity streamEntity = StreamFixture.getStreamEntity();

        when(decoderService.findDecoder(decoderSerialNumber)).thenReturn(decoderEntity);
        when(decoderMapper.toDecoderDTO(decoderEntity.get())).thenReturn(decoderDTO);
        when(encoderService.findEncoder(encoderSerialNumber)).thenReturn(encoderEntity);
        when(encoderMapper.toEncoderDTO(encoderEntity.get())).thenReturn(encoderDto);
        when(streamRepository.existsBySerialNumbers(encoderSerialNumber, decoderSerialNumber)).thenReturn(false);
        when(streamMapper.toEntity(any())).thenReturn(streamEntity);

        //when
        streamService.createStream(createStreamRequest);

        //then
        verify(streamRepository).save(streamEntity);
    }

    @Test
    public void testDeleteStream(){
        //given
        long streamId = StreamFixture.ID;

        //when
        streamService.deleteStream(streamId);

        //then
        verify(streamRepository).deleteById(streamId);
    }

    @Test
    public void testUpdateStream(){
        //given
        long streamId = StreamFixture.ID;
        StreamDTO streamDto = StreamFixture.getStreamDto();
        StreamEntity streamEntity = StreamFixture.getStreamEntity();

        when(streamRepository.existsById(streamId)).thenReturn(true);
        when(streamMapper.toEntity(streamDto)).thenReturn(streamEntity);

        //when
        streamService.updateStream(streamDto);

        //verify
        verify(streamRepository).save(streamEntity);
    }

}
