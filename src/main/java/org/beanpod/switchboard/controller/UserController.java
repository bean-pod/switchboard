package org.beanpod.switchboard.controller;

import lombok.AllArgsConstructor;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;



@Controller
@AllArgsConstructor
public class UserController {

  private final UserService userService;

  @GetMapping("/sign-up")
  public String signUpPage(UserEntity user) {

    return "sign-up";
  }

  @PostMapping("/sign-up")
  public void signUp(UserEntity user) {

    userService.signUpUser(user);

  }


}
