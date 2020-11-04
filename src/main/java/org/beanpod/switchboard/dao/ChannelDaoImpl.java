package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.controller.DecoderController;
import org.beanpod.switchboard.controller.EncoderController;
import org.beanpod.switchboard.dto.ChannelDTO;
import org.beanpod.switchboard.dto.DecoderDTO;
import org.beanpod.switchboard.dto.EncoderDTO;
import org.beanpod.switchboard.dto.mapper.DecoderMapper;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.repository.ChannelRepository;
import org.openapitools.model.CreateChannelRequest;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChannelDaoImpl {
    private final ChannelRepository channelRepository;
    private final ChannelMapper mapper;
    private final DecoderDaoImpl decoderService;
    private final EncoderDaoImpl encoderService;
    private final DecoderMapper decoderMapper;
    private final EncoderMapper encoderMapper;

    public List<Long> getChannels(){
        return channelRepository.getAllId();
    }

    public ChannelDTO getChannelById(Long id){
        return mapper.toDto(channelRepository.getOne(id));
    }

    public void createChannel(CreateChannelRequest createChannelRequest){
        //TODO service should return DTOs instead. It will also handle exception cases when we move it.
        DecoderDTO decoderDto = decoderService.findDecoder(createChannelRequest.getDecoderSerialNumber()).map(decoderMapper::toDecoderDTO).orElseThrow(RuntimeException::new);
        EncoderDTO encoderDto = encoderService.findEncoder(createChannelRequest.getEncoderSerialNumber()).map(encoderMapper::toEncoderDTO).orElseThrow(RuntimeException::new);
        ChannelDTO channelDto = ChannelDTO.builder()
                .name(createChannelRequest.getName())
                .port(createChannelRequest.getPort())
                .decoder(decoderDto)
                .encoder(encoderDto)
                .build();

        ChannelEntity channelEntity = mapper.toEntity(channelDto);

        if(channelRepository.existsDuplicate(createChannelRequest.getEncoderSerialNumber(), createChannelRequest.getDecoderSerialNumber(), createChannelRequest.getPort())) {
            throw new ExceptionType.ChannelAlreadyExistsException(createChannelRequest.getDecoderSerialNumber(), createChannelRequest.getEncoderSerialNumber());
        }
        channelRepository.save(channelEntity);
    }

    public void deleteChannel(Long id){
        channelRepository.deleteById(id);
    }

    public void updateChannel(ChannelDTO channelDto){
        if(!channelRepository.existsById(channelDto.getId())){
            throw new ExceptionType.ChannelDoesNotExistsException(channelDto.getId());
        }
        ChannelEntity channelEntity = mapper.toEntity(channelDto);
        channelRepository.save(channelEntity);
    }
}
