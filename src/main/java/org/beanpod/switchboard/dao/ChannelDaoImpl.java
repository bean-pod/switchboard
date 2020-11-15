package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.InputChannelDTO;
import org.beanpod.switchboard.dto.OutputChannelDTO;
import org.beanpod.switchboard.dto.mapper.InputChannelMapper;
import org.beanpod.switchboard.dto.mapper.OutputChannelMapper;
import org.beanpod.switchboard.entity.ChannelEntity;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.beanpod.switchboard.entity.OutputChannelEntity;
import org.beanpod.switchboard.repository.ChannelRepository;
import org.beanpod.switchboard.repository.InputChannelRepository;
import org.beanpod.switchboard.repository.OutputChannelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChannelDaoImpl {
    private final InputChannelRepository inputChannelRepository;
    private final InputChannelMapper inputChannelMapper;
    private final OutputChannelRepository outputChannelRepository;
    private final OutputChannelMapper outputChannelMapper;

    @Autowired
    ChannelRepository channelRepository;

    public List<ChannelEntity> getChannels(){
        return channelRepository.findAll();
    }

    public Optional<ChannelEntity> findChannel(Long id){
        return channelRepository.findChannelEntitiesById(id);
    }

    public Long deleteChannel(Long id){
       return channelRepository.deleteChannelEntitiesById(id);
    }

    public ChannelEntity save(ChannelEntity channelEntity){
        return channelRepository.save(channelEntity);
    }
    public InputChannelDTO getInputChannelById(Long id) {
        //TODO this is necessary to avoid a stackoverflow since Encoders/Decoders reference input/output channels which reference Decoders. I suggest adding CRUD endpoints to channels and not referencing the channels in the Encoder/Decoder at all.
        InputChannelEntity inputChannelEntity = inputChannelRepository.getOne(id);
        removeChannelReference(inputChannelEntity);
        return inputChannelMapper.toDto(inputChannelEntity);
    }

    public void saveInputChannel(InputChannelDTO inputChannelDto) {
        inputChannelRepository.save(inputChannelMapper.toEntity(inputChannelDto));
    }

    public OutputChannelDTO getOutputChannelById(Long id) {
        //TODO this is necessary to avoid a stackoverflow since Encoders/Decoders reference input/output
        // channels which reference Decoders. I suggest adding CRUD endpoints to channels and not referencing the
        // channels in the Encoder/Decoder at all.
        OutputChannelEntity outputChannelEntity = outputChannelRepository.getOne(id);
        return outputChannelMapper.toDto(outputChannelEntity);
    }

    public void saveOutputChannel(OutputChannelDTO outputChannelDto) {
        outputChannelRepository.save(outputChannelMapper.toEntity(outputChannelDto));
    }


    //TODO this is necessary to avoid a stackoverflow since Encoders/Decoders reference input/output
    // channels which reference Decoders. I suggest adding CRUD endpoints to channels and not referencing the
    // channels in the Encoder/Decoder at all.
    private void removeChannelReference(InputChannelEntity inputChannelEntity) {
        inputChannelEntity.getDecoder().setInputs(null);
    }
}
