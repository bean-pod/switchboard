package org.beanpod.switchboard.dao;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.InputChannelDTO;
import org.beanpod.switchboard.dto.OutputChannelDTO;
import org.beanpod.switchboard.dto.mapper.InputChannelMapper;
import org.beanpod.switchboard.dto.mapper.OutputChannelMapper;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.beanpod.switchboard.entity.OutputChannelEntity;
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
        //TODO this is necessary to avoid a stackoverflow since Encoders/Decoders reference input/output channels which reference Decoders. I suggest adding CRUD endpoints to channels and not referencing the channels in the Encoder/Decoder at all.
        InputChannelEntity inputChannelEntity = inputChannelRepository.getOne(id);
        removeChannelReference(inputChannelEntity);
        return inputChannelMapper.toDto(inputChannelEntity);
    }

    public void saveInputChannel(InputChannelDTO inputChannelDto){
        inputChannelRepository.save(inputChannelMapper.toEntity(inputChannelDto));
    }

    public OutputChannelDTO getOutputChannelById(Long id){
        //TODO this is necessary to avoid a stackoverflow since Encoders/Decoders reference input/output channels which reference Decoders. I suggest adding CRUD endpoints to channels and not referencing the channels in the Encoder/Decoder at all.
        OutputChannelEntity outputChannelEntity = outputChannelRepository.getOne(id);
        removeChannelReference(outputChannelEntity);
        return outputChannelMapper.toDto(outputChannelEntity);
    }

    public void saveOutputChannel(OutputChannelDTO outputChannelDto){
        outputChannelRepository.save(outputChannelMapper.toEntity(outputChannelDto));
    }

    //TODO this is necessary to avoid a stackoverflow since Encoders/Decoders reference input/output channels which reference Decoders. I suggest adding CRUD endpoints to channels and not referencing the channels in the Encoder/Decoder at all.
    private void removeChannelReference(OutputChannelEntity outputChannelEntity){
        outputChannelEntity.getEncoder().setOutputs(null);
    }

    //TODO this is necessary to avoid a stackoverflow since Encoders/Decoders reference input/output channels which reference Decoders. I suggest adding CRUD endpoints to channels and not referencing the channels in the Encoder/Decoder at all.
    private void removeChannelReference(InputChannelEntity inputChannelEntity){
        inputChannelEntity.getDecoder().setInputs(null);
    }
}
