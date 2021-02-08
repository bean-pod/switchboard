package org.beanpod.switchboard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.UserDto;
import org.beanpod.switchboard.fixture.UserFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.UserModel;
import org.springframework.http.ResponseEntity;

class UserControllerTest {

  @InjectMocks private UserController userController;
  @Mock private UserDaoImpl userDao;
  private static UserModel userModel;
  private static UserDto userDto;

  @BeforeEach
  void setupUserFixture(){
    userModel = UserFixture.getUserModel();
    userDto  = UserFixture.getUserDto();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  final void signUp(){
    when(userDao.save(userModel)).thenReturn(userDto);
    ResponseEntity<String> response = userController.signUp(userModel);
    assertEquals("User moh@gmail.com has been successfully created", response.getBody());
  }
}
