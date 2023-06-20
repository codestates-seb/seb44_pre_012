package pre_Project.server.domain.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import pre_Project.server.domain.user.dto.UserDto;
import pre_Project.server.domain.user.entitiy.User;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    default User userRegisterToUser(UserDto.Register requestBody) {
        User user = new User();
        user.setEmail(requestBody.getEmail());
        user.setUserName(requestBody.getUserName());
        user.setPassWord(requestBody.getPassWord());

        return user;
    }
    User userLoginToUser(UserDto.Login requestBody);
    default User userPatchToUser(UserDto.Patch requestBody) {
        User user = new User();
        user.setUserId(requestBody.getUserId());
        user.setEmail(requestBody.getEmail());
        user.setUserName(requestBody.getUserName());
        user.setPassWord(requestBody.getPassWord());
        user.setUserStatus(requestBody.getUserStatus());

        return user;
    }
    default UserDto.Response userToUserResponse(User user) {
        UserDto.Response response = new UserDto.Response();
        response.setEmail(user.getEmail());
        response.setUserName(user.getUserName());
        response.setUserStatus(user.getUserStatus());
        response.setUserId(user.getUserId());

        return response;
    }
    default List<UserDto.Response> usersToResponseList(List<User> users) {
        if ( users == null ) {
            return null;
        }

        List<UserDto.Response> list = new ArrayList<UserDto.Response>( users.size() );
        for ( User user : users ) {
            list.add( userToUserResponse( user ) );
        }

        return list;
    }
}
