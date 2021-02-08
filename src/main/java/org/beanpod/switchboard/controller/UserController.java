package org.beanpod.switchboard.controller;

import lombok.AllArgsConstructor;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.entity.UserEntity;
import org.openapitools.model.UserModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@AllArgsConstructor
public class UserController  {

  private final UserDaoImpl userDao;

  @GetMapping("/sign-up")
  public String signUpPage(UserEntity user) {

    return "sign-up";
  }

  @RequestMapping(value="/user/sign-up", method= RequestMethod.POST)
  public String signUp(@ModelAttribute("userEntity")UserModel user) {
    userDao.save(user);
    return "redirect:/sign-up";
//    return ResponseEntity.ok("User "+ user.getEmail() + " has been successfully saved");
  }


}
