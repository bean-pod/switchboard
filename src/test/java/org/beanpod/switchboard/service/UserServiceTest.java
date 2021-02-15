package org.beanpod.switchboard.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.UserDto;
import org.beanpod.switchboard.entity.SwitchBoardUserDetails;
import org.beanpod.switchboard.fixture.UserFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.UserModel;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

class UserServiceTest {

  private static UserModel userModel1;
  private static UserDto userDto;
  private static SwitchBoardUserDetails switchBoardUserDetails;
  @InjectMocks private UserService userService;
  @Mock private UserModel userModel;
  @Mock private UserDaoImpl userDao;
  @Mock private BCryptPasswordEncoder bcryptPasswordEncoder;

  @BeforeEach
  void setupUserFixture() {
    MockitoAnnotations.initMocks(this);
    userModel1 = UserFixture.getUserModel();
    userDto = UserFixture.getUserDto();
    switchBoardUserDetails = UserFixture.getUserDetails();
  }

  @Test
  final void testLoadUserByName() {
    when(userDao.loadUserByUsername("moh@gmail.com")).thenReturn(switchBoardUserDetails);
    UserDetails response = userService.loadUserByUsername("moh@gmail.com");
    assertEquals("moh@gmail.com", response.getUsername());
  }

  @Test
  final void testSignUpUser() {
    when(userModel.getPassword()).thenReturn("1234.");
    when(bcryptPasswordEncoder.encode("1234.")).thenReturn("eow");
    userDto.setPassword("eow");
    when(userDao.save(userModel1)).thenReturn(userDto);

    UserDto response = userService.signUpUser(userModel1);
    assertEquals("eow", response.getPassword());
  }
}
