package org.beanpod.switchboard.dao;

import org.beanpod.switchboard.dto.DecoderDTO;
import org.beanpod.switchboard.dto.mapper.DecoderMapper;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.repository.DecoderRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class DecoderDaoImpl {

    private final DecoderRepository decoderRepository;
    private final DecoderMapper decoderMapper;

    public DecoderDaoImpl(DecoderRepository decoderRepository, DecoderMapper decoderMapper) {
        this.decoderRepository = decoderRepository;
        this.decoderMapper = decoderMapper;
    }

    public List<DecoderEntity> getDecoders() {
        return decoderRepository.findAll();
    }

    public Optional<DecoderDTO> findDecoder(String serialNumber) {
        return decoderRepository.
                findDecoderBySerialNumber(serialNumber).map(decoderMapper::toDecoderDTO);
    }

    public DecoderDTO save(DecoderDTO decoderDTO) {
        return decoderMapper.toDecoderDTO(decoderRepository
                .save(decoderMapper.toDecoderEntity(decoderDTO)));
    }

    public Long deleteDecoder(String serialNumber) {
        return decoderRepository.deleteDecoderEntityBySerialNumber(serialNumber);
    }

}
