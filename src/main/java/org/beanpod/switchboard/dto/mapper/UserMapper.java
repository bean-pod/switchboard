package org.beanpod.switchboard.dto.mapper;

import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.UserDto;
import org.beanpod.switchboard.entity.UserEntity;
import org.mapstruct.Mapper;
import org.openapitools.model.UserModel;

@Mapper(
    componentModel = "spring")
public interface UserMapper {

UserDto toUserDto(UserEntity userEntity);

DeviceDto toUserDto(UserModel userModel);

UserModel toUserModel(UserDto userDto);

UserEntity toUserEntity(UserDto userDto);

UserEntity toUserEntity(UserModel userModel);
}
