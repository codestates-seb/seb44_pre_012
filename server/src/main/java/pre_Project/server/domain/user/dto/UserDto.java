package pre_Project.server.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pre_Project.server.domain.user.entitiy.User;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UserDto {
    @Getter
    @AllArgsConstructor
    public static class Register {
        @NotBlank
        @Email
        private String email;
        @NotBlank
        private String userName;
        @NotBlank
        private String password;
    }

    @Getter
    @AllArgsConstructor
    public static class Login {
        @NotBlank
        private String email;
        @NotBlank
        private String password;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long userId;
        private String email;
        private String userName;
        private String password;
        private User.UserStatus userStatus;

        public void setUserId(long userId) {
            this.userId = userId;
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long userId;
        private String email;
        private String userName;
        private User.UserStatus userStatus;
        public String getUserStatus(){
            return userStatus.getStatus();
        }
    }
}
