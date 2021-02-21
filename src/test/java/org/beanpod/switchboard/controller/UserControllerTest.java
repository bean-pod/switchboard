package org.beanpod.switchboard.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.beanpod.switchboard.dto.UserDto;
import org.beanpod.switchboard.fixture.UserFixture;
import org.beanpod.switchboard.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.openapitools.model.UserModel;
import org.springframework.http.ResponseEntity;

class UserControllerTest {

  private static UserModel userModel;
  private static UserDto userDto;
  @InjectMocks private UserController userController;
  @Mock private UserService userService;

  @BeforeEach
  void setupUserFixture() {
    userModel = UserFixture.getUserModel();
    userDto = UserFixture.getUserDto();
  }

  @BeforeEach
  void setup() {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  final void signUp() {
    when(userService.signUpUser(userModel)).thenReturn(userDto);
    ResponseEntity<String> response = userController.signUp(userModel);
    assertEquals("User moh@gmail.com has been successfully created", response.getBody());
  }
}
