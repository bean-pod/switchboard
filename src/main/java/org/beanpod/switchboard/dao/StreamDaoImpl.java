package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.DecoderDTO;
import org.beanpod.switchboard.dto.EncoderDTO;
import org.beanpod.switchboard.dto.StreamDTO;
import org.beanpod.switchboard.dto.mapper.DecoderMapper;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.entity.mapper.StreamMapper;
import org.beanpod.switchboard.repository.StreamRepository;
import org.springframework.stereotype.Service;
import org.openapitools.model.CreateStreamRequest;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StreamDaoImpl {
    private final StreamRepository streamRepository;
    private final StreamMapper mapper;
    private final DecoderDaoImpl decoderService;
    private final EncoderDaoImpl encoderService;
    private final DecoderMapper decoderMapper;
    private final EncoderMapper encoderMapper;

    public List<Long> getStreams(){
        return streamRepository.getAllUuid();
    }

    public StreamDTO getStreamById(Long id){
        return mapper.toDto(streamRepository.getOne(id));
    }

    public void createStream(CreateStreamRequest createStreamRequest){
        //TODO service should return DTOs instead.
        DecoderDTO decoderDto = decoderMapper.toDecoderDTO(decoderService.findDecoder(createStreamRequest.getDecoderSerialNumber()).get());
        EncoderDTO encoderDto = encoderMapper.toEncoderDTO(encoderService.findEncoder(createStreamRequest.getDecoderSerialNumber()).get());
        StreamDTO streamDto = new StreamDTO();
        streamDto.setDecoder(decoderDto);
        streamDto.setEncoder(encoderDto);

        StreamEntity streamEntity = mapper.toEntity(streamDto);
        streamRepository.save(streamEntity);
    }

    public void deleteStream(Long id){
        streamRepository.deleteById(id);
    }

    public void updateStream(StreamDTO streamDto){
        StreamEntity streamEntity = mapper.toEntity(streamDto);
        streamRepository.getOne(streamDto.getId());
        streamRepository.save(streamEntity);
    }
}
