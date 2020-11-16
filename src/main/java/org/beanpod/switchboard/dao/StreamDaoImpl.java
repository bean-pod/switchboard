package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dto.InputChannelDTO;
import org.beanpod.switchboard.dto.OutputChannelDTO;
import org.beanpod.switchboard.dto.StreamDTO;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.repository.StreamRepository;
import org.openapitools.model.CreateStreamRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StreamDaoImpl {
    private final StreamRepository streamRepository;
    private final StreamMapper mapper;
    private final ChannelDaoImpl channelService;

    public List<Long> getStreams(){
        return streamRepository.getAllId();
    }

    public StreamDTO getStreamById(Long id) {
        StreamEntity streamEntity = streamRepository.getOne(id);
        return mapper.toDto(streamEntity);
    }

    public void createStream(CreateStreamRequest createStreamRequest) {
        InputChannelDTO inputChannelDTO = channelService.getInputChannelById(createStreamRequest.getInputChannelId());
        OutputChannelDTO outputChannelDTO = channelService.getOutputChannelById(createStreamRequest.getOutputChannelId());
        StreamDTO streamDto = StreamDTO.builder()
                .inputChannel(inputChannelDTO)
                .outputChannel(outputChannelDTO)
                .build();
        StreamEntity streamEntity = mapper.toEntity(streamDto);
        if(streamRepository.existsDuplicate(createStreamRequest.getInputChannelId(), createStreamRequest.getOutputChannelId())){
            throw new ExceptionType.StreamAlreadyExistsException(createStreamRequest.getInputChannelId(), createStreamRequest.getOutputChannelId());
        }
        streamRepository.save(streamEntity);
    }

    public void deleteStream(Long id) {
        streamRepository.deleteById(id);
    }

    public void updateStream(StreamDTO streamDto) {
        if(!streamRepository.existsById(streamDto.getId())){
            throw new ExceptionType.StreamDoesNotExistException(streamDto.getId());
        }
        StreamEntity streamEntity = mapper.toEntity(streamDto);
        streamRepository.save(streamEntity);
    }
}
