package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.UserDto;
import org.beanpod.switchboard.entity.UserEntity;
import org.mapstruct.Mapper;
import org.openapitools.model.UserModel;

@Mapper(componentModel = "spring")
public interface UserMapper {

  UserDto toDto(UserEntity userEntity);

  UserDto toDto(UserModel userModel);

  UserEntity toEntity(UserDto userDto);

  UserEntity toEntity(UserModel userModel);

  UserModel toModel(UserDto userDto);
}
