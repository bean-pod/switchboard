package org.beanpod.switchboard.dao;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dto.LogDto;
import org.beanpod.switchboard.dto.mapper.LogMapper;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.repository.LogRepository;
import org.openapitools.model.LogModel;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LogDaoImpl {

  private final LogRepository logRepository;
  private final LogMapper logMapper;
  private final HttpServletRequest request;
  private final UserDaoImpl userDao;

  public List<LogModel> getLogs() {
    UserEntity user = userDao.findUser(request.getUserPrincipal().getName());
    return logMapper.toLogModels(logRepository.findAll(user.getId()));
  }

  public List<LogModel> getDeviceLogs(String serialNumber) {
    return logMapper.toLogModels(logRepository.findBySerialNumber(serialNumber));
  }

  public LogDto createLog(LogDto logDto) {
    return logMapper.logEntityToLogDto(logRepository.save(logMapper.toLogEntity(logDto)));
  }
}
