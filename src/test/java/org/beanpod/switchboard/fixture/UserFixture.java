package org.beanpod.switchboard.fixture;

import org.beanpod.switchboard.dto.UserDto;
import org.beanpod.switchboard.entity.SwitchBoardUserDetails;
import org.beanpod.switchboard.entity.UserEntity;
import org.openapitools.model.UserModel;

public class UserFixture {

  public static SwitchBoardUserDetails getUserDetails() {
    return new SwitchBoardUserDetails()
        .builder()
        .username("moh@gmail.com")
        .password("1234.")
        .build();
  }

  public static UserModel getUserModel() {
    return new UserModel().username("moh@gmail.com").password("1234.");
  }

  public static UserDto getUserDto() {
    return new UserDto().builder().username("moh@gmail.com").password("1234.").build();
  }

  public static UserEntity getUserEntity() {
    return new UserEntity().builder().username("moh@gmail.com").password("1234.").build();
  }
}
