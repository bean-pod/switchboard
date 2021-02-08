package org.beanpod.switchboard.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.beanpod.switchboard.entity.UserRole;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {

  private Long id;

  private String name;

  @Email(message = "Email should be valid")
  @NotEmpty private String email;

  private String password;

  @Builder.Default private UserRole userRole = UserRole.USER;

  @Builder.Default private Boolean locked = false;

  @Builder.Default private Boolean enabled = false;
}
