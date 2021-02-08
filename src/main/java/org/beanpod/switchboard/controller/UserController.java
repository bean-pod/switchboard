package org.beanpod.switchboard.controller;

import lombok.AllArgsConstructor;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.openapitools.api.UserApi;
import org.openapitools.model.UserModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
public class UserController implements UserApi {

  private final UserDaoImpl userDao;

  @Override
  public ResponseEntity<String> signUp(UserModel user) {
    userDao.save(user);
    return ResponseEntity.ok("User " + user.getUserName() + " has been successfully created");
  }
}
