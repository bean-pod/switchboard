package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.ChannelDTO;
import org.beanpod.switchboard.dto.InputChannelDTO;
import org.beanpod.switchboard.dto.OutputChannelDTO;
import org.beanpod.switchboard.dto.mapper.ChannelMapper;
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
    @Autowired
    ChannelRepository channelRepository;
    @Autowired
    ChannelMapper channelMapper;
    @Autowired
    InputChannelRepository inputChannelRepository;
    @Autowired
    InputChannelMapper inputChannelMapper;
    @Autowired
    OutputChannelRepository outputChannelRepository;
    @Autowired
    OutputChannelMapper outputChannelMapper;


    public List<ChannelEntity> getChannels(){
        return channelRepository.findAll();
    }

    public Optional<ChannelDTO> findChannel(Long id){
        return channelRepository.
                findChannelEntitiesById(id).map(channelMapper::toChannelDTO);
    }

    public Long deleteChannel(Long id){
       return channelRepository.deleteChannelEntitiesById(id);
    }

    public ChannelDTO save(ChannelDTO channelDTO){
        return channelMapper.toChannelDTO(
                channelRepository.save(channelMapper.toChannelEntity(channelDTO)));
    }

    public InputChannelDTO saveInputChannel(InputChannelDTO inputChannelDto) {
        return inputChannelMapper.toInputChannelDTO(inputChannelRepository
                .save(inputChannelMapper.toInputChannelEntity(inputChannelDto)));
    }

    public OutputChannelDTO saveOutputChannel(OutputChannelDTO outputChannelDto) {
       return outputChannelMapper.toOutputChannelDTO(outputChannelRepository
               .save(outputChannelMapper.toOutputChannelEntity(outputChannelDto)));
    }

    public InputChannelDTO getInputChannelById(Long id) {
        InputChannelEntity inputChannelEntity = inputChannelRepository.getOne(id);
        return inputChannelMapper.toInputChannelDTO(inputChannelEntity);
    }

    public OutputChannelDTO getOutputChannelById(Long id) {
        OutputChannelEntity outputChannelEntity = outputChannelRepository.getOne(id);
        return outputChannelMapper.toOutputChannelDTO(outputChannelEntity);
    }

    public Long deleteOutputChannelById(Long id){
        return outputChannelRepository.deleteOutputChannelEntitiesById(id);
    }

    public Long deleteInputChannelById(Long id){
        return inputChannelRepository.deleteInputChannelEntityById(id);
    }


}
