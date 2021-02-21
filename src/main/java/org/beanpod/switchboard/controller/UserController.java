package org.beanpod.switchboard.controller;

import lombok.AllArgsConstructor;
import org.beanpod.switchboard.service.UserService;
import org.openapitools.api.UserApi;
import org.openapitools.model.UserModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
public class UserController implements UserApi {

  private final UserService userService;

  @Override
  public ResponseEntity<String> signUp(UserModel user) {

    userService.signUpUser(user);
    return ResponseEntity.ok("User " + user.getUsername() + " has been successfully created");
  }
}
