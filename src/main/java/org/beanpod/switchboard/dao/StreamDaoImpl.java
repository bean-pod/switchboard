package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.*;
import org.beanpod.switchboard.dto.mapper.StreamMapper;
import org.beanpod.switchboard.entity.StreamEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.repository.StreamRepository;
import org.openapitools.model.CreateStreamRequest;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

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

    public StreamDTO getStreamById(Long id){
        StreamEntity streamEntity = streamRepository.getOne(id);
        //TODO this is necessary to avoid a stackoverflow since Encoders/Decoders reference input/output channels which reference Decoders. I suggest adding CRUD endpoints to channels and not referencing the channels in the Encoder/Decoder at all.
        Optional.of(streamEntity).ifPresent(this::removeChannelReferences);
        return mapper.toDto(streamEntity);
    }

    public void createStream(CreateStreamRequest createStreamRequest){
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

    public void deleteStream(Long id){
        streamRepository.deleteById(id);
    }

    public void updateStream(StreamDTO streamDto){
        if(!streamRepository.existsById(streamDto.getId())){
            throw new ExceptionType.StreamDoesNotExistException(streamDto.getId());
        }
        StreamEntity streamEntity = mapper.toEntity(streamDto);
        streamRepository.save(streamEntity);
    }

    //TODO this is necessary to avoid a stackoverflow since Encoders/Decoders reference input/output channels which reference Decoders. I suggest adding CRUD endpoints to channels and not referencing the channels in the Encoder/Decoder at all.
    private void removeChannelReferences(StreamEntity streamEntity){
        Optional.of(streamEntity).ifPresent(se -> se.getInputChannel().getDecoder().setInputs(null));
        Optional.of(streamEntity).ifPresent(se -> se.getOutputChannel().getEncoder().setOutputs(null));
    }
}
