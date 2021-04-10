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
import org.beanpod.switchboard.dto.DecoderDto;
import org.beanpod.switchboard.dto.mapper.DecoderMapper;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.repository.DecoderRepository;
import org.beanpod.switchboard.util.UserMockUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

class DecoderDaoImplTest {

  // stubbed DeviceEntity object
  private static DecoderEntity decoder;
  private static DecoderDto decoderDto;
  private static List<DecoderEntity> listOfdecoders;
  private static UserEntity user;
  @InjectMocks private DecoderDaoImpl decoderDaoImpl;
  @Mock private DecoderRepository decoderRepository;
  @Mock private DecoderMapper decoderMapper;
  @Mock private HttpServletRequest httpServletRequest;
  @Mock private UserPrincipal userPrincipal;
  @Mock private UserDaoImpl userDao;

  @BeforeEach
  void setup() {
    setupDecoderFixture();

    MockitoAnnotations.initMocks(this);

    UserMockUtil.mockUser(user, httpServletRequest, userPrincipal, userDao);
  }

  private void setupDecoderFixture() {
    decoderDto = DecoderFixture.getDecoderDto();
    decoder = DecoderFixture.getDecoderEntity1();
    listOfdecoders = DecoderFixture.getListOfDecoders();
    user = UserFixture.getUserEntity();
  }

  @Test
  final void testSave() {
    when(decoderMapper.toDecoderDto(any())).thenReturn(decoderDto);
    when(decoderMapper.toDecoderEntity(any())).thenReturn(decoder);
    when(decoderRepository.save(decoder)).thenReturn(decoder);
    DecoderDto decoderDTO = decoderDaoImpl.save(user, decoderDto);
    assertEquals(decoderDTO, decoderDto);
  }

  @Test
  final void testSaveIfNotEmpty() {
    DecoderDaoImpl decoderDaoImp = new DecoderDaoImpl(decoderRepository, decoderMapper);
    DecoderDaoImpl decoderDaoImp1 = Mockito.spy(decoderDaoImp);
    Mockito.doReturn(Optional.of(decoderDto)).when(decoderDaoImp1).findDecoder(eq(user), any());
    when(decoderDaoImp.findDecoder(eq(user), any())).thenReturn(Optional.of(decoderDto));
    when(decoderMapper.toDecoderDto(any())).thenReturn(decoderDto);
    when(decoderMapper.toDecoderEntity(any())).thenReturn(decoder);
    when(decoderRepository.save(decoder)).thenReturn(decoder);
    DecoderDto decoderDTO = decoderDaoImp1.save(user, decoderDto);
    assertEquals(decoderDTO, decoderDto);
  }

  @Test
  final void testFindDecoder() {
    when(decoderMapper.toDecoderDto(any())).thenReturn(decoderDto);
    when(decoderMapper.toDecoderEntity(any())).thenReturn(decoder);
    when(decoderRepository.findByDeviceUserAndSerialNumber(user, DecoderFixture.SERIAL_NUMBER))
        .thenReturn(java.util.Optional.of(decoder));
    Optional<DecoderDto> decoderDTO =
        decoderDaoImpl.findDecoder(user, DecoderFixture.SERIAL_NUMBER);
    assertEquals(decoderDto, decoderDTO.get());
  }

  @Test
  final void testGetDecoders() {
    when(decoderRepository.findByDeviceUser(user)).thenReturn(listOfdecoders);
    List<DecoderEntity> deviceEntities = decoderDaoImpl.getDecoders(user);
    assertIterableEquals(deviceEntities, listOfdecoders);
  }

  @Test
  final void testDeleteDecoder() {
    when(decoderRepository.deleteByDeviceUserAndSerialNumber(user, DecoderFixture.SERIAL_NUMBER))
        .thenReturn((long) 1);
    Long response = decoderDaoImpl.deleteDecoder(user, DecoderFixture.SERIAL_NUMBER);
    assertEquals(1L, response);
  }
}
