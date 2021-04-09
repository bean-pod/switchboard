package org.beanpod.switchboard.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import java.nio.file.attribute.UserPrincipal;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.mapper.EncoderMapper;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.repository.EncoderRepository;
import org.beanpod.switchboard.util.UserMockUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

class EncoderDaoImplTest {

  // stubbed DeviceEntity object
  private static EncoderEntity encoder;
  private static EncoderDto encoderDto;
  private static List<EncoderEntity> listOfEncoders;
  private static UserEntity user;
  @InjectMocks private EncoderDaoImpl encoderDaoImpl;
  @Mock private EncoderRepository encoderRepository;
  @Mock private EncoderMapper encoderMapper;
  @Mock private HttpServletRequest httpServletRequest;
  @Mock private UserPrincipal userPrincipal;
  @Mock private UserDaoImpl userDao;

  @BeforeEach
  void setup() {
    setupEncoderFixture();

    MockitoAnnotations.initMocks(this);

    UserMockUtil.mockUser(user, httpServletRequest, userPrincipal, userDao);
  }

  private void setupEncoderFixture() {
    encoder = EncoderFixture.getEncoderEntity1();
    encoderDto = EncoderFixture.getEncoderDto();
    listOfEncoders = EncoderFixture.getListOfEncoder();
    user = UserFixture.getUserEntity();
  }

  @Test
  final void testSave() {
    when(encoderMapper.toEncoderDto(any(EncoderEntity.class))).thenReturn(encoderDto);
    when(encoderMapper.toEncoderEntity(any())).thenReturn(encoder);
    when(encoderRepository.save(encoder)).thenReturn(encoder);
    EncoderDto encoderDTO = encoderDaoImpl.save(user, encoderDto);
    assertEquals(encoderDTO, encoderDto);
  }

  @Test
  final void testSaveIfNotEmpty() {
    EncoderDaoImpl encoderDaoImp = new EncoderDaoImpl(encoderRepository, encoderMapper);
    EncoderDaoImpl encoderDaoImp1 = Mockito.spy(encoderDaoImp);
    Mockito.doReturn(Optional.of(encoderDto)).when(encoderDaoImp1).findEncoder(eq(user), any());
    when(encoderDaoImp.findEncoder(eq(user), any())).thenReturn(Optional.of(encoderDto));
    when(encoderMapper.toEncoderDto(any(EncoderEntity.class))).thenReturn(encoderDto);
    when(encoderMapper.toEncoderEntity(any())).thenReturn(encoder);
    when(encoderRepository.save(encoder)).thenReturn(encoder);
    EncoderDto encoderDTO = encoderDaoImp1.save(user, encoderDto);
    assertEquals(encoderDTO, encoderDto);
  }

  @Test
  final void testFindEncoder() {
    when(encoderMapper.toEncoderDto(any(EncoderEntity.class))).thenReturn(encoderDto);
    when(encoderMapper.toEncoderEntity(any())).thenReturn(encoder);
    when(encoderRepository.findEncoderByDeviceUserAndSerialNumber(
            user, EncoderFixture.SERIAL_NUMBER))
        .thenReturn(java.util.Optional.of(encoder));
    Optional<EncoderDto> encoderDTO =
        encoderDaoImpl.findEncoder(user, EncoderFixture.SERIAL_NUMBER);
    assertEquals(encoderDTO.get(), encoderDto);
  }

  @Test
  final void testGetEncoders() {
    when(encoderRepository.findEncoderEntitiesByDeviceUser(user)).thenReturn(listOfEncoders);
    List<EncoderEntity> deviceEntities = encoderDaoImpl.getEncoders(user);
    assertIterableEquals(deviceEntities, listOfEncoders);
  }

  @Test
  final void testDeleteEncoder() {
    when(encoderRepository.deleteEncoderEntityByDeviceUserAndSerialNumber(
            user, EncoderFixture.SERIAL_NUMBER))
        .thenReturn((long) 1);
    Long response = encoderDaoImpl.deleteEncoder(user, EncoderFixture.SERIAL_NUMBER);
    assertEquals(1, response);
  }
}
