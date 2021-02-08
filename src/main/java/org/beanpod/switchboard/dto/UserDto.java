package org.beanpod.switchboard.dto;

import javax.validation.constraints.NotNull;
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

  @NotNull private String userName;

  @NotNull private String password;

  @Builder.Default private UserRole userRole = UserRole.USER;
}
