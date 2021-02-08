package org.beanpod.switchboard.controller;

import lombok.AllArgsConstructor;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.openapitools.api.UserApi;
import org.openapitools.model.UserModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@AllArgsConstructor
public class UserController implements UserApi {

  private final UserDaoImpl userDao;

  @GetMapping("/sign-up")
  public String signUpPage(UserModel user) {

    return "sign-up";
  }

  @Override
  public ResponseEntity<String> signUp(UserModel user) {
    userDao.save(user);
    return ResponseEntity.ok("User " + user.getEmail() + " has been successfully created");
  }
}
