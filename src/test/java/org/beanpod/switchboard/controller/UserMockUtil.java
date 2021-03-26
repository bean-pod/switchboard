package org.beanpod.switchboard.controller;

import static org.mockito.Mockito.when;

import java.nio.file.attribute.UserPrincipal;
import javax.servlet.http.HttpServletRequest;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.entity.UserEntity;

public class UserMockUtil {
  static void mockUser(UserEntity user, HttpServletRequest httpServletRequest, UserPrincipal userPrincipal, UserDaoImpl userDao){
    when(httpServletRequest.getUserPrincipal()).thenReturn(userPrincipal);
    when(userPrincipal.getName()).thenReturn(user.getUsername());
    when(userDao.findUser(user.getUsername())).thenReturn(user);
  }
}
