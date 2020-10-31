package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.DecoderDTO;
import org.beanpod.switchboard.dto.EncoderDTO;
import org.beanpod.switchboard.dto.StreamDTO;
import org.beanpod.switchboard.dto.mapper.DecoderMapper;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.entity.mapper.StreamMapper;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.repository.StreamRepository;
import org.openapitools.model.CreateStreamRequest;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StreamDaoImpl {
    private final StreamRepository streamRepository;
    private final StreamMapper mapper;
    private final DecoderDaoImpl decoderService;
    private final EncoderDaoImpl encoderService;
    private final DecoderMapper decoderMapper;
    private final EncoderMapper encoderMapper;

    public List<Long> getStreams(){
        return streamRepository.getAllId();
    }

    public StreamDTO getStreamById(Long id){
        return mapper.toDto(streamRepository.getOne(id));
    }

    public void createStream(CreateStreamRequest createStreamRequest){
        //TODO service should return DTOs instead. It will also handle exception cases when we move it.
        DecoderDTO decoderDto = decoderMapper.toDecoderDTO(decoderService.findDecoder(createStreamRequest.getDecoderSerialNumber()).get());
        EncoderDTO encoderDto = encoderMapper.toEncoderDTO(encoderService.findEncoder(createStreamRequest.getEncoderSerialNumber()).get());
        StreamDTO streamDto = StreamDTO.builder()
                .decoder(decoderDto)
                .encoder(encoderDto)
                .build();

        StreamEntity streamEntity = mapper.toEntity(streamDto);

        if(streamRepository.existsBySerialNumbers(createStreamRequest.getEncoderSerialNumber(), createStreamRequest.getDecoderSerialNumber())){
            throw new ExceptionType.StreamAlreadyExistsException(createStreamRequest.getDecoderSerialNumber(), createStreamRequest.getEncoderSerialNumber());
        }
        streamRepository.save(streamEntity);
    }

    public void deleteStream(Long id){
        streamRepository.deleteById(id);
    }

    public void updateStream(StreamDTO streamDto){
        if(!streamRepository.existsById(streamDto.getId())){
            throw new ExceptionType.StreamDoesNotExistsException(streamDto.getId());
        }
        StreamEntity streamEntity = mapper.toEntity(streamDto);
        streamRepository.save(streamEntity);
    }
}
