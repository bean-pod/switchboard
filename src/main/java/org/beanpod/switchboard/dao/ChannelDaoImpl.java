package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.InputChannelDTO;
import org.beanpod.switchboard.dto.OutputChannelDTO;
import org.beanpod.switchboard.dto.mapper.InputChannelMapper;
import org.beanpod.switchboard.dto.mapper.OutputChannelMapper;
import org.beanpod.switchboard.repository.InputChannelRepository;
import org.beanpod.switchboard.repository.OutputChannelRepository;
import org.openapitools.model.InputChannelModel;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChannelDaoImpl {
    private final InputChannelRepository inputChannelRepository;
    private final InputChannelMapper inputChannelMapper;
    private final OutputChannelRepository outputChannelRepository;
    private final OutputChannelMapper outputChannelMapper;

    public InputChannelDTO getInputChannelById(Long id){
        return inputChannelMapper.toDto(inputChannelRepository.getOne(id));
    }

    public void saveInputChannel(InputChannelDTO inputChannelDto){
        inputChannelRepository.save(inputChannelMapper.toEntity(inputChannelDto));
    }

    public OutputChannelDTO getOutputChannelById(Long id){
        return outputChannelMapper.toDto(outputChannelRepository.getOne(id));
    }

    public void saveOutputChannel(OutputChannelDTO outputChannelDto){
        outputChannelRepository.save(outputChannelMapper.toEntity(outputChannelDto));
    }
}
