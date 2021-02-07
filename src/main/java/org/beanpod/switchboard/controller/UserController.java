package org.beanpod.switchboard.controller;

import lombok.AllArgsConstructor;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
@AllArgsConstructor
public class UserController {

  private final UserService userService;

  @PostMapping("/sign-up")
  public String signUp(UserEntity user) {

    userService.signUpUser(user);

  }

}
